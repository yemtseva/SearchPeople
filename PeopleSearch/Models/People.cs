using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeopleSearch.Models
{
    public class People
    {
        public int PeopleId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public string Interests { get; set; }
        public string Photo { get; set; }


        public People()
        {
            this.PeopleId = 1;
            this.Name = "Test Name";
            this.Address = "Test Address";
            this.Age = 1;
            this.Interests = "Test Interests";
            this.Photo = "testphoto.png";
        }
    }



}