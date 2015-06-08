import DS from 'ember-data';
 
export default DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', {defaultValue: false}), //Tell if the todo is completed or not
  ver: DS.attr('number', {defaultValue: 0}) //version number of the to-do item
});