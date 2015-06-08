import DRFSerializer from 'ember-django-adapter/adapters/drf';
import DRFAdapter from 'ember-django-adapter/adapters/drf';
import DS from 'ember-data';

var CustomOnlineSerializer = DRFSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    todo: { embedded: 'always' }
  },
  serialize: function(record){
    var json=this._super.apply(this, arguments);
    json.id=record.id;
    return json;
  }
});

var CustomOnlineAdapter = DRFAdapter.extend({
  serializer: CustomOnlineSerializer.create(),
  host: 'http://192.168.1.117:8000',
  namespace: 'api'// your server namespace
});

var OnlineStore = DS.Store.extend({
  adapterFor: function() {
    return this.container.lookup('adapter:_custom_store');
  },

  serializerFor: function() {
    return this.container.lookup('serializer:_custom_store');
  }
});

export default {
  name: "onlineStore",

  initialize: function(container, application) {
    CustomOnlineSerializer.reopen({ container: container });

    container.register('store:online', OnlineStore);
    container.register('adapter:_custom_store', CustomOnlineAdapter);
    container.register('serializer:_custom_store', CustomOnlineSerializer);

    application.inject('route',      'onlineStore', 'store:online');
    application.inject('controller', 'onlineStore', 'store:online');
  }
};