﻿using System;
using Microsoft.AspNetCore.Mvc;
using Restaurants.API.Models.Api;
using System.Net;
using Restaurants.API.Services.Implementation;
using Microsoft.AspNetCore.Authorization;
using Restaurants.API.Models.EntityFramework;
using System.Collections.Generic;

namespace Restaurants.API.Controllers
{
	[Route("api/restaurant")]
	public class RestaurantController : BaseController
	{
		private RestaurantService Service;

		public RestaurantController() : base()
		{
			Service = new RestaurantService(new Models.Context.AppDbContext(), this.GetCurrentUser());
		}

		[HttpGet("")]
		[AllowAnonymous]
		public IActionResult GetRestaurantsByOwner(long ownerId, int pageNumber = 1, int pageSize = 10)
		{
			List<RestaurantObjects> result;
			try
			{
				result = Service.GetOwnerRestaurants(ownerId, pageNumber, pageSize);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ex));
			}

			return Ok(result);
		}		

		[HttpGet("{id}")]
		[AllowAnonymous]
		public IActionResult Get(long id)
		{
			RestaurantObjects result;
			try
			{
				result = Service.GetRestaurant(id);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ex));
			}

			return Ok(result);
		}

		[HttpPost("")]
		public IActionResult AddRestaurant([FromBody] RestaurantsModel model)
		{
			if (!ModelState.IsValid)
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ModelState));

			Tuple<RestaurantObjects, EmployersRestaurants> result;
			try
			{
				People currentUser = this.GetCurrentUser();
				result = Service.AddNewRestaurant(
					currentUser.ThePersonAsEmployer.Id,
					model.Name, model.Description);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ex));
			}

			return Ok(result.ToValueTuple());
		}

		[HttpPut("{id}")]
		public IActionResult UpdateRestaurant(int id, [FromBody] RestaurantsModel model)
		{
			if (!ModelState.IsValid)
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ModelState));

			RestaurantObjects result;
			try
			{
				People currentUser = this.GetCurrentUser();
				result = Service.UpdateRestaurant(
					currentUser.ThePersonAsEmployer.Id,
					id, model.Name, model.Description);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ex));
			}

			return Ok(result);
		}

		[HttpDelete("{id}")]
		public IActionResult CloseRestaurant(int id)
		{
			bool result;
			try
			{
				People currentUser = this.GetCurrentUser();
				result = Service.CloseRestaurant(currentUser.ThePersonAsEmployer.Id, id);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, GetErrorList(ex));
			}

			return Ok(result);
		}
	}
}