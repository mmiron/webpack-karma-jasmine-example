/**
 * Basic API Wrapper Service to interact with RESTful resources and to
 * centralize resource URLs.
 **/
import _ from 'lodash'

export default class RestService {

	/**
	 * Injects Angular's $http service to handle the HTTP method
	 * invocations.
	 **/
	static get $inject() {
		return ['$http', 'restApiResourcePaths'];
	}

	/**
     * Constructs the RestService class by passing in dependencies and
     * a resource paths map.
     *
     * REQUIRED:
     * @param $http
     *     The Angular $http service which is delegated to for HTTP
     *     method invocations.
     * @param resourcePaths
     * 	   A flat JSON object containing key value pairs for API resources
     *     and their corresponding URI locations.
     **/
	constructor($http, restApiResourcePaths) {
		// The Angular $http service
		this.$http = $http;

		// This object holds a list of API resource URIs
		this.resourceUriMap = _.mapValues(restApiResourcePaths, function(a) {
			return _.trimEnd(a,'/');
		});
	}

	/**
	 * Retrieves a resource's base URI path from the RestService's resource
	 * map. Resource names are in UPPERCASE and use underscores (_) to
	 * delimit words. For example: 'DEFERRAL_REFERENCE'.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 *
	 * @return
	 * A string representing the base URI path for the resource.
	 **/
	getResourceUrl(aResourceName) {
		return this.resourceUriMap[aResourceName];
	}

	/**
	 * Sends a HTTP GET request to the API for the specified resource
	 * with the specified id and optional parameters.
	 * This method delegates to the @link{RestService#get} method.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 * @param aId
	 *     The unique ID of the resource to find
	 *
	 * OPTIONAL:
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	getById(aResourceName, aId, aParams = {}) {
		let url = this.getResourceUrl(aResourceName) + '/' + aId;

		return this.$http.get(url, {params: aParams});
	}

	/**
	 * Sends either a HTTP POST or HTTP PUT request to the API for the
	 * specified resource with optional parameters. If a non empty or null
	 * id is passed in, it will attempt to update an existing resource.
	 * Otherwise, it will attempt to create a new resource.
	 * This method delegates to the @link{RestService#post} and
	 * @link{RestService#put} methods.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 * @param aResource
	 *     The Javascript representation of the resource object
	 *
	 * OPTIONAL:
	 * @param aId
	 *     The unique ID of the resource to save
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	save(aResourceName, aResource, aId, aParams = {}) {
	 	// Create
	 	if (_.isNil(aId) || _.isEmpty(aId)) {
	 		return this.post(aResourceName, aResource, aParams);
	 	}

	 	// Update
	 	return this.put(aResourceName, aId, aResource, aParams);
	}

	/**
	 * Sends a HTTP GET request to the API for the specified resource with
	 * optional parameters. This can be used for searching for resources.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 *
	 * OPTIONAL:
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	get(aResourceName, aParams = {}) {
		let url = this.getResourceUrl(aResourceName);
		return this.$http.get(url, {params: aParams});
	}

	/**
	 * Sends a HTTP POST request to the API for the specified resource with
	 * optional parameters. This is used to explicitly create a resource.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 * @param aResource
	 *     The Javascript representation of the resource object
	 *
	 * OPTIONAL:
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	post(aResourceName, aResource, aParams = {}) {
		let url = this.getResourceUrl(aResourceName);
		return this.$http.post(url, aResource, {params: aParams});
	}

	/**
	 * Sends a HTTP PUT request to the API for the specified resource with
	 * the specified id and any optional parameters. This is used to explicitly
	 * update a resource.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 * @param aId
	 *     The unique ID of the resource to update
	 * @param aResource
	 *     The Javascript representation of the resource object
	 *
	 * OPTIONAL:
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	put(aResourceName, aId, aResource, aParams = {}) {
		let url = this.getResourceUrl(aResourceName) + '/' + aId;
	 	return this.$http.put(url, aResource, {params: aParams});
	}

	/**
	 * Sends a HTTP DELETE request to the API for the specified resource with
	 * the specified id and any optional parameters. This is used to delete
	 * a resource.
	 *
	 * REQUIRED:
	 * @param aResourceName
	 *     The name of the resource
	 * @param aId
	 *     The unique ID of the resource to update
	 *
	 * OPTIONAL:
	 * @param aParams
	 *     The parameters object
	 *
	 * @return
	 * A promise object that will contain the HTTP response object.
	 **/
	delete(aResourceName, aId, aParams = {}) {
		let url = this.getResourceUrl(aResourceName) + '/' + aId;
		return this.$http.delete(url, {params: aParams});
	}
}
