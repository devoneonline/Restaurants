﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Restaurants.API.Models.EntityFramework
{
    [Serializable]
    public class RestaurantObjects : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [NonSerialized]
        private ICollection<OpenHoursSchedule> _OpenHours;

        public virtual ICollection<OpenHoursSchedule> TheRestaurantsOpenHours
        {
            get
            {
                return _OpenHours;
            }
            set
            {
                _OpenHours = value;
            }
        }

        [NonSerialized]
        private ICollection<PhoneContacts> _PhoneContact;

        public virtual ICollection<PhoneContacts> TheRestaurantsContactNumbers
        {
            get
            {
                return _PhoneContact;
            }
            set
            {
                _PhoneContact = value;
            }
        }

        [NonSerialized]
        private ICollection<LocationContact> _LocationContact;

        public virtual ICollection<LocationContact> TheRestaurantLocationAddresses
        {
            get
            {
                return _LocationContact;
            }
            set
            {
                _LocationContact = value;
            }
        }

        [NonSerialized]
        private ICollection<Menus> _Menu;

        public virtual ICollection<Menus> TheRestaurantMenu
        {
            get
            {
                return _Menu;
            }
            set
            {
                _Menu = value;
            }
        }

        [NonSerialized]
        private ICollection<EmployersRestaurants> _Owner;

        public ICollection<EmployersRestaurants> TheRestaurantEmployers
        {
            get
            {
                return _Owner;
            }
            set
            {
                _Owner = value;
            }
        }

        [NonSerialized]
        private ICollection<Employees> _Employee;

        public ICollection<Employees> TheRestaurantsEmployees
        {
            get
            {
                return _Employee;
            }
            set
            {
                _Employee = value;
            }
        }

    }
}