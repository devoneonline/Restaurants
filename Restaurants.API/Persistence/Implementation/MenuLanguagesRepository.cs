﻿using System.Security.Cryptography.X509Certificates;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Restaurants.API.Models.Context;
using Restaurants.API.Models.EntityFramework;
using System.Threading.Tasks;
using System;

namespace Restaurants.API.Persistence.Implementation
{
	public class MenuLanguagesRepository : CrudRepository<MenuLanguages>
	{
		public MenuLanguagesRepository(AppDbContext dbContext) : base(dbContext)
		{
		}

		internal Task<List<MenuLanguages>> GetItemsByMenuId(long menuId)
		{
			return this.DbSet
				.Where(x => x.MenuId == menuId)
				.Include(x => x.ModifiedBy)
				.Include(x => x.CreatedBy)
				.Include(x => x.TheLanguage)
				.ToListAsync();
		}

		internal Task<List<MenuLanguages>> GetItemsByMenuIdPaged(long menuId, int pageNumber, int pageSize)
		{
			return this.DbSet
				.Where(x => x.MenuId == menuId)
				.Include(x => x.ModifiedBy)
				.Include(x => x.CreatedBy)
				.Include(x => x.TheLanguage)
				.Skip((pageNumber - 1 )*pageSize)
				.Take(pageSize)
				.ToListAsync();
		}
	}

}
