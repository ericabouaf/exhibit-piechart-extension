/*==================================================
 *  Exhibit.PiechartView
 *==================================================
 */

google.load("visualization", "1", {packages:["piechart"]});
 
Exhibit.PiechartView = function(containerElmt, uiContext) {
   
    this._div = containerElmt;
    this._uiContext = uiContext;

    this._settings = {};
    this._accessors = {};

    var view = this;
    this._listener = { 
        onItemsChanged: function() {
            view._reconstruct(); 
        }
    };
    uiContext.getCollection().addListener(this._listener);
};


Exhibit.PiechartView._settingSpecs = {};

Exhibit.PiechartView._accessorSpecs = [];    


Exhibit.PiechartView.create = function(configuration, containerElmt, uiContext) {
    var view = new Exhibit.PiechartView(
        containerElmt,
        Exhibit.UIContext.create(configuration, uiContext)
    );
    Exhibit.PiechartView._configure(view, configuration);
    
    view._internalValidate();
    view._initializeUI();
    return view;
};

Exhibit.PiechartView.createFromDOM = function(configElmt, containerElmt, uiContext) {
    var configuration = Exhibit.getConfigurationFromDOM(configElmt);
    var view = new Exhibit.PiechartView(
        containerElmt != null ? containerElmt : configElmt, 
        Exhibit.UIContext.createFromDOM(configElmt, uiContext)
    );
    
    Exhibit.SettingsUtilities.createAccessorsFromDOM(configElmt, Exhibit.PiechartView._accessorSpecs, view._accessors);
    Exhibit.SettingsUtilities.collectSettingsFromDOM(configElmt, Exhibit.PiechartView._settingSpecs, view._settings);
    Exhibit.PiechartView._configure(view, configuration);
    
    view._internalValidate();
    view._initializeUI();
    return view;
};

Exhibit.PiechartView._configure = function(view, configuration) {
    Exhibit.SettingsUtilities.createAccessors(configuration, Exhibit.PiechartView._accessorSpecs, view._accessors);
    Exhibit.SettingsUtilities.collectSettings(configuration, Exhibit.PiechartView._settingSpecs, view._settings);
    
    var accessors = view._accessors;
    view._getDuration = function(itemID, database, visitor) {
        accessors.getProxy(itemID, database, function(proxy) {
            accessors.getDuration(proxy, database, visitor);
        });
    };
};

Exhibit.PiechartView.prototype.dispose = function() {    
    this._div.innerHTML = "";
    this._div = null;
    
    this._uiContext.dispose();
    this._uiContext = null;
};

Exhibit.PiechartView.prototype._internalValidate = function() {
};

Exhibit.PiechartView.prototype._initializeUI = function() {
   
   var database = this._uiContext.getDatabase();
   
   
   // Create the selectProperty SELECT element
   this.selectProperty = document.createElement('select');
   for(var key in database._properties) {
      if(database._properties.hasOwnProperty(key)) {
         var option = document.createElement('option');
         option.innerHTML = database._propertyArray[i];
         this.selectProperty.appendChild(option);
      }
   }
   this._div.appendChild(this.selectProperty);
   var self = this;
   this.selectProperty.onchange = function() {
      self._reconstruct();
   };
   
   // Chart Element
   this._chartDiv = document.createElement('div');
   this._div.appendChild(this._chartDiv);
   
    
   this._reconstruct();
};


Exhibit.PiechartView.prototype._reconstruct = function() {
   
    var self = this;
    var collection = this._uiContext.getCollection();
    var database = this._uiContext.getDatabase();
    var settings = this._settings;
    var accessors = this._accessors;
    
    this._chartDiv.innerHTML = "";
    
    
    
    var valuesHash = {};
    var entries = 0;
    var groupingProperty = this.selectProperty.value;
    var currentSet = collection.getRestrictedItems();
    for(var itemID in currentSet._hash) {
       if(currentSet._hash.hasOwnProperty(itemID)) {
          var value = database.getObject(itemID, groupingProperty);
          if(valuesHash.hasOwnProperty(value)) {
             valuesHash[value] += 1;
          }
          else {
             entries++;
             valuesHash[value] = 1;
          }
       }
    }
    
    
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Task');
   data.addColumn('number', 'Hours per Day');
   data.addRows(entries);
   var i = 0;
   for(key in valuesHash) {
      if(valuesHash.hasOwnProperty(key)) {
         data.setValue(i, 0, key);
         data.setValue(i, 1, valuesHash[key]);
         i++;
      }
   }

   var chart = new google.visualization.PieChart( this._chartDiv);
   chart.draw(data, {width: 600, height: 360, is3D: true, title: 'Items grouped by '+groupingProperty});
};

