import $ from 'jquery'
const host = 'http://localhost:9000'

export const get = (route) => {
	const url = host + route

	return new Promise((resolve, reject) => {
		
$.ajax({
	url: url,
	type: "GET",
	beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
	success: function(response) { 
		resolve(response)
	},
	error: function(err){
		reject(err)
	}
});
	})
}

export const post = (route, dataIn) => {
	const url = host + route
	let dataToPass = JSON.stringify(dataIn)
	console.log(dataToPass)
	return new Promise((resolve, reject) => {

		// fetch(`${url}`, {
		//       method: "POST",
		//       mode: "no-cors",
		//       headers: {
		      	
		// 	    'Accept': 'application/json',
		// 	    'Content-Type': 'application/json',
		// 	    'Cache': 'no-cache',
			     
		// 	  },
		// 	  credentials: 'include',
		//       body: dataToPass,

		//     })
		//     .then(response => response.json())
		//     .then(res => resolve(res))
		//     .catch(error => reject({ error: "Server Error" }));

		// fetch('/your/server_endpoint', {
  //   method: 'POST',
  //   mode: 'same-origin',
  //   redirect: 'follow',
  //   credentials: 'include', // Don't forget to specify this if you need cookies
  //   headers: headers,
  //   body: JSON.stringify({
  //       first_name: 'John',
  //       last_name: 'Doe'
  //   })
// })

$.ajax({
	url: url,
	type: "POST",
	data: dataIn,
	beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
	success: function(response) { 
		resolve(response)
	},
	error: function(err){
		reject(err)
	}
});
		// $.post( url , dataIn)
		// .done(function( data ) {
		// 	resolve(data)
		// })
		// .fail(function(err) {
		// 	reject(err)
		// })	
	})
}

export const del = (route) => {
	const url = host + route
	return new Promise((resolve, reject) => {
		$.ajax({
			beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
			credentials: 'include',
			xhrFields: {
		      withCredentials: true
		   },
		    url: url,
		    type: 'DELETE',
		    success: function(data) {
		        resolve(data)
		    },
		    fail: function(err) {
		    	reject(err)
		    }
		});
	})
}