using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Models
{
    public class TodoItemList: List<TodoItemModel>
    {

        public TodoItemModel GetTodoItemById(string id)
        {
            for (int i = 0; i < this.Count; i++)
                if (this[i].Id == id)
                    return this[i];
            return new TodoItemModel();
        }
         int GetIndexTaskById(string id)
        {
            for (int i = 0; i < this.Count; i++)
                if (this[i].Id == id)
                    return i;
            return -1;
        }

        public TodoItemModel Push(string text)
        {
            TodoItemModel tm = new TodoItemModel();
            tm.Text = text;
            tm.IsDone = false;
            tm.Id = Guid.NewGuid().ToString();

            this.Add(tm);
            return tm;
        }

        public bool Delete(string id)
        {
            int index = GetIndexTaskById(id);
            if(index != -1)
                return this.Remove(this[index]);
            else
                throw new Exception("Todo not found");
        }

        public TodoItemModel Edit(string id, string text, bool done)
        {
            int index = GetIndexTaskById(id);
            if (index != -1)
            {
                this[index].Text = text;
                this[index].IsDone = done;
            }
            else
                throw new Exception("Todo not found");
            return this[index];
        }
    }
}
