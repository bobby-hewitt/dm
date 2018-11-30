import $ from 'jquery'
const host = 'http://localhost:9000'

export const get = (route) => {
	const url = host + route

	return new Promise((resolve, reject) => {
		$.get(url, (data) =>{
			resolve(data)
		}).fail((err) => {
			reject(err)
		})
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

		fetch(url, {
		    method: 'POST',
		    mode: 'no-cors',
		    headers: {      	
			    
			    'Content-Type': 'application/json',
			    
			},
		    redirect: 'follow',
		    credentials: 'include', // Don't forget to specify this if you need cookies
		    body: dataToPass
		})
		.then(response => response.json())
		    .then(res => resolve(res))
		    .catch(error => reject({ error: "Server Error" }));
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