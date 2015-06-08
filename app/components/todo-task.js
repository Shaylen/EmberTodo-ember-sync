import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'li',
    classNameBindings: ['isCompleted:completed', 'isEditing:editing'],

    isCompleted: function(key, value) {
        var todo = this.get('todo');

        if(value === undefined) {
            return todo.get('isCompleted');
        } else {
            todo.set('isCompleted', value);
            todo.save();
            return value;
        }
    },

    isEditing: false,
    
    actions: {
        editTodo: function() {
            this.set('isEditing', true);
        },

        saveEdit: function() {
            this.set('isEditing', false);

            if(Ember.isEmpty(this.get('title'))) {
                this.send('removeTodo');
            } else {
                this.get('todo').save();
            }
        },

        removeTodo: function() {
            var todo = this.get('todo');
            this.emberSync.deleteRecord('todo', todo);
            todo.emberSync.save();
        }
    }
});