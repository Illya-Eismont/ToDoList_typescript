using HotChocolate;
using HotChocolate.Data;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;

namespace Project1.Querys
{

    public class TodoList
    {
        public List<TodoItemModel> todoItems;

        public TodoList(List<TodoItemModel> todoItems) => this.todoItems = todoItems;
    }

    public class TodoItemQuery
    {
        [GraphQLNonNullType]
        [UseSorting]
        async public Task<IEnumerable<TodoItemModel>> GetTodoItems([Service] IHttpContextAccessor httpContextAccessor, [Service] DataBaseService db)
        {
            
            string id = httpContextAccessor.HttpContext.Request.Cookies["id"];
            if (!httpContextAccessor.HttpContext.Request.Cookies.ContainsKey("id"))
            {
                id = ObjectId.GenerateNewId().ToString();
                httpContextAccessor.HttpContext.Response.Cookies.Append("id", id);
                await db.AddUser(new User(id));
            }
            User user = await db.GetUser(id);

            return user.TodoItems as List<TodoItemModel>;
        }
    }


}
