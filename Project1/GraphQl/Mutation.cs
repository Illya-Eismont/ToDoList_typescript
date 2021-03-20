using HotChocolate;
using HotChocolate.Data;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;

namespace Project1.GraphQl
{
    public class Mutation
    {
        readonly DataBaseService db;
        public Mutation([Service] DataBaseService db)
        {
            this.db = db;
        }

        [UseSorting]
        async public Task<TodoItemList> UpdateTodoItem(string id, string text, bool isDone, [Service] IHttpContextAccessor httpContextAccessor)
        {
            User user = await db.GetUser(httpContextAccessor.HttpContext.Request.Cookies["id"]);
            user.TodoItems.Edit(id, text, isDone);
            user = await db.UpdateUser(user);

            return user.TodoItems;
        }

        [UseSorting]
        async public Task<TodoItemList> AddTodoItem(string text, [Service] IHttpContextAccessor httpContextAccessor)
        {
            User user = await db.GetUser(httpContextAccessor.HttpContext.Request.Cookies["id"]);
            user.TodoItems.Push(text);
            user = await db.UpdateUser(user);

            return user.TodoItems;
        }

        [UseSorting]
        async public Task<TodoItemList> RemoveTodoItem(string id, [Service] IHttpContextAccessor httpContextAccessor)
        {
            User user = await db.GetUser(httpContextAccessor.HttpContext.Request.Cookies["id"]);

            user.TodoItems.Delete(id);
            user = await db.UpdateUser(user);

            return user.TodoItems;
        }
    }
}
