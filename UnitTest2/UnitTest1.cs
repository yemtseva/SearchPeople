using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using PeopleSearch;
using PeopleSearch.Controllers;
using PeopleSearch.Models;


namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        PeopleController Pplcontroller = new PeopleController();
        People testModel = new People();
        [TestMethod]
        public void AddTest()
        {
            
            string result = Pplcontroller.Post(testModel) as string;
            Assert.AreNotSame("Added Successfully!!", result);
           
            result = Pplcontroller.Delete(1) as string;
            Assert.AreNotSame("Deleted Successfully!!", result);

        }

        [TestMethod]
        public void UpdateTest()
        { 
            string result = Pplcontroller.Put(testModel) as string;
            Assert.AreNotSame("Updated Successfully!!", result);
        }

        [TestMethod]
        public void DeleteTest()
        {
            string result = Pplcontroller.Delete(8) as string;
            Assert.AreNotSame("Deleted Successfully!!", result);
        }

        [TestMethod]
        public void SaveFileTest()
        {
            string result = Pplcontroller.SaveFile() as string;
            Assert.AreSame("anonymous.png", result);
        }
    }
}
