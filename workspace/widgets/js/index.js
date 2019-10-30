function addvalueToWorkSpace(id) {
  var ele = document.getElementById(id)
  loadworkspace(ele)
}

function loadworkspace (ele) {
  var button = document.createElement('BUTTON')
  var node = document.createTextNode(ele.value)
  button.appendChild(node)
  button.setAttribute('id', ele.value)
  button.setAttribute('ondblclick', 'remove_operator(this.id)')
  var work = document.getElementById('workspace')
  work.appendChild(button)
}
var workspaceSection = document.querySelector('.mainSection')
var widgets = document.querySelectorAll('.col-1')

for (let i = 0; i < widgets.length; i++) {
  widgets[i].addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('srcId', event.target.id)
  })
}

workspaceSection.addEventListener('dragover', function (event) {
  event.preventDefault()
})

workspaceSection.addEventListener('drop', function (event) {
  event.preventDefault()
  var target = event.target
  var data = event.dataTransfer.getData('srcId')
  var copy = document.getElementById(data).cloneNode(true)
  var canDrop = target.classList.contains('mainSection')

  if (canDrop) {
    loadworkspace(copy)
  }
})
