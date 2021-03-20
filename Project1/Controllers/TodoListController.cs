using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;

namespace TodoList.Controllers
{   
    [Route("api/{controller}/{action}/{id?}")]
    public class TodoListController : Controller
    {
        DataBaseService db;

        public TodoListController(DataBaseService context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string id = Request.Cookies["id"];
            if (!Request.Cookies.ContainsKey("id"))
            {
                id = ObjectId.GenerateNewId().ToString();
                Response.Cookies.Append("id", id);
                await db.AddUser(new User(id));
            }
            User user = await db.GetUser(id);
            return new JsonResult(user.TodoItems);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string text)
        {

            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Push(text);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Delete(id);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }
        
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TodoItemModel todoItem)
        {
            User user = await db.GetUser(Request.Cookies["id"]);
            user.TodoItems.Edit(todoItem.Id, todoItem.Text, todoItem.IsDone);

            user = await db.UpdateUser(user);

            return new JsonResult(user.TodoItems);
        }

       
    }

}
