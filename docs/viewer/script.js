function setValue(obj){
  document.getElementById(obj.id).value = obj.value;
  api.parameters.updateAsync(obj);
} 
var hash = location.hash.replace("#","");
var args = hash.split(",");

// container for the viewer, typically this is a div
var _container = document.getElementById('sdv-container');
// viewer settings 
var _viewerSettings = {
  // container to use 
  container: _container,
  // when creating the viewer, we want to get back an API v2 object 
  api: {
    version: 2
  },
  // ticket for a ShapeDiver model 
  ticket: 'f8efc50556bf78056d120547c388c2f1053864d3a48f4994ee7f8c3dbb781772a8dc210269a3ee8844e77be17b5e3dfc0287ba7a8c632ad72d3d0998aa9971d18b04898a9b5ce4b02100a8567b1abadd21698eec964ad0adb05cfc2ed8d5c1f0b6fb508ffbbf51671e4b1026808dc06520de821ed6a5-d7c325db87432a22bbca9f8ca5f9596d',
  modelViewUrl: 'eu-central-1'
};

// create the viewer, get back an API v2 object 
var api = new SDVApp.ParametricViewer(_viewerSettings);

var viewerInit = false;
var parameters;
api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
  if (!viewerInit) {
    var globalDiv = document.getElementById("parameters");
    parameters = api.parameters.get();
    parameters.data.sort(function(a, b) {
      return a.order - b.order;
    });
    console.log(parameters.data);
    for (let i = 0; i < parameters.data.length; i++) {
      let paramInput = null;
      let paramDiv = document.createElement("div");
      let param = parameters.data[i];
      let label = document.createElement("label");
      label.setAttribute("for", param.id);
      label.innerHTML = param.name;
      if (param.type == "Int" || param.type == "Float" || param.type == "Even" || param.type == "Odd") {
        paramInput = document.createElement("input");
        paramInput.setAttribute("id", param.id);
        paramInput.setAttribute("type", "range");
        paramInput.setAttribute("min", param.min);
        paramInput.setAttribute("max", param.max);
        paramInput.setAttribute("value", param.value);
        if (param.type == "Int") paramInput.setAttribute("step", 1);
        else if (param.type == "Even" || param.type == "Odd") paramInput.setAttribute("step", 2);
        else paramInput.setAttribute("step", 1 / Math.pow(10, param.decimalplaces));
        paramInput.onchange = function() {
          api.parameters.updateAsync({
            id: param.id,
            value: this.value
          });
        }

      } else if (param.type == "Bool") {
        paramInput = document.createElement("input");
        paramInput.setAttribute("id", param.id);
        paramInput.setAttribute("type", "checkbox");
        paramInput.setAttribute("checked", param.value);
        paramInput.onchange = function() {
          console.log(this);
          api.parameters.updateAsync({
            id: param.id,
            value: this.checked
          });
        };
      } else if (param.type == "String") {
        paramInput = document.createElement("input");
        paramInput.setAttribute("id", param.id);
        paramInput.setAttribute("type", "text");
        paramInput.setAttribute("value", param.value);
        paramInput.onchange = function() {
          api.parameters.updateAsync({
            id: param.id,
            value: this.value
          });
        };
      } else if (param.type == "Color") {
        paramInput = document.createElement("input");
        paramInput.setAttribute("id", param.id);
        paramInput.setAttribute("type", "color");
        paramInput.setAttribute("value", param.value);
        paramInput.onchange = function() {
          api.parameters.updateAsync({
            id: param.id,
            value: this.value
          });
        };
      } else if (param.type == "StringList") {
        paramInput = document.createElement("select");
        paramInput.setAttribute("id", param.id);
        for (let j = 0; j < param.choices.length; j++) {
          let option = document.createElement("option");
          option.setAttribute("value", j);
          option.setAttribute("name", param.choices[j]);
          option.innerHTML = param.choices[j];
          if (param.value == j) option.setAttribute("selected", "");
          paramInput.appendChild(option);
        }
        paramInput.onchange = function() {
          api.parameters.updateAsync({
            id: param.id,
            value: this.value
          });
        };
      }
      if (param.hidden) paramDiv.setAttribute("hidden", "");
      paramDiv.appendChild(label);
      paramDiv.appendChild(paramInput);
      globalDiv.appendChild(paramDiv);
    }

    var exports = api.exports.get();
    for (let i = 0; i < exports.data.length; i++) {
      let exportAsset = exports.data[i];
      let exportDiv = document.createElement("div");
      let exportInput = document.createElement("input");
      exportInput.setAttribute("id", exportAsset.id);
      exportInput.setAttribute("type", "button");
      exportInput.setAttribute("name", exportAsset.name);
      exportInput.setAttribute("value", exportAsset.name);
      exportInput.onclick = function() {
        api.exports.requestAsync({
          id: this.id
        }).then(
          function(response) {
            let link = response.data.content[0].href;
            window.location = link;
          }
        );
      };
      exportDiv.appendChild(exportInput);
      globalDiv.appendChild(exportDiv);
    }
    viewerInit = true;
    start();
  }
});


function start(){
  setValue({id:"cd21fabe-0052-4e40-b9b5-004a73793c9e", value:args[0]})
  setValue({id:"69fccc0b-6481-4d0e-970d-ad37e8570765", value:args[1]})
  setValue({id:"588c6806-fd97-4a58-9521-c37f3e1c5803", value:args[2]})
  setValue({id:"5d1b8657-b184-47bc-b8a3-321ef7c87497", value:args[3]})
  setValue({id:"0e1707a2-9707-4302-a3b1-51a46352164e", value:args[4]})
  setValue({id:"6deadaa2-0cf1-47ee-9460-83aa6913c92c", value:args[5]})
  setValue({id:"6882aa09-d6c3-48ca-aef8-912aa2327511", value:args[6]})
  setTimeout("getImageofViz()", 4000);
}
