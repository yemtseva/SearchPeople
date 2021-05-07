using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PeopleSearch.Models;
using System.Web;
using Ubiety.Dns.Core;
using System.Diagnostics;

namespace PeopleSearch.Controllers
{
    public class PeopleController : ApiController
    {
        public HttpResponseMessage Get()
        {

            string query = @"
                            select PeopleId, Name, Address, Age, Interests, Photo from
                            dbo.People
                            ";
            DataTable table = new DataTable();
            using(var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["PeopleAppDB"].ConnectionString))
                using(var cmd = new SqlCommand(query, con))
            using(var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(People dep)
        {
            try
            {
                string query = @"
                    insert into dbo.People values
                    (
                    '" + dep.Name + @"'
                    ,'" + dep.Address + @"'
                    ,'" + dep.Age + @"'
                    ,'" + dep.Interests + @"'
                    ,'" + dep.Photo + @"'
                    )
                    ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PeopleAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully!!";
            }
            catch (Exception)
            {

                return "Failed to Add!!";
            }
        }

        public string SearchPpl()
        {
            throw new NotImplementedException();
        }

        public string Put(People dep)
        {
            try
            {
                string query = @"
                                update dbo.People set 
                                Name='" + dep.Name + @"'
                                ,Address='" + dep.Address + @"'
                                ,Age='" + dep.Age + @"'
                                ,Interests='" + dep.Interests + @"'
                                ,Photo='" + dep.Photo + @"'
                                where PeopleId=" + dep.PeopleId+@"
                                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PeopleAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {

                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            
            try
            {
                string query = @"
                                delete from dbo.People
                                where PeopleId=" + id + @"
                                ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["PeopleAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {

                return "Failed to Delete";
            }

        }

        [Route("api/People/SaveFile")]
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }

            catch (Exception)
            {
                return "anonymous.png";
            }
        }

        

        [HttpGet]
        [Route("api/People/SearchPpl")]
        public HttpResponseMessage SearchPpl(string searchInput)
        {
            string query = @"
                            SELECT PeopleId, Name, Address, Age, Interests, Photo 
                            FROM dbo.People
                            WHERE Name LIKE '%" + searchInput + @"%'";
                            
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["PeopleAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

    }
}
