class SimpleDataTableWidget{


    constructor(containerID)
    {

        let objName = "dataTableExample";
        // languAge=HTML
        let dialogs = "\n" +
            "<div class=\"modal fade\" id=\"addRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"addRowModalTitle\">CREATE PERSON</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <div class=\"\">\n" +
            "                    <label for=\"FirstNameCreateInput\">First Name</label>\n" +
            "                    <input required id=\"FirstNameCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"FirstNameCreateInput\">Last Name</label>\n" +
            "                    <input  required id=\"LastNameCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"FirstNameCreateInput\">Age of person</label>\n" +
            "                    <input required id=\"AgeCreateInput\" type=\"number\" class=\"form-control\">\n" +
            "                    <label for=\"FirstNameCreateInput\">City</label>\n" +
            "                    <input required id=\"CityCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeAddRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickCreatePerson('"+objName+"')\">Create</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"deleteRowsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteRowsModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"deleteRowsModalTitle\">DELETE PERSONS</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                Are you sure you want to delete persons?\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeDeleteRowsModalModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
            "                <button type=\"button\" class=\"btn btn-danger\" onclick=\"onClickDeletePerson('"+objName+"')\">Yes</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"updateRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"updateRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"updateRowModalTitle\">UPDATE PERSON</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <label for=\"FirstNameCreateInput\">First Name</label>\n" +
            "                <input required id=\"FirstNameUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"FirstNameCreateInput\">Last Name</label>\n" +
            "                <input  required id=\"LastNameUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"FirstNameCreateInput\">Age of person</label>\n" +
            "                <input required id=\"AgeUpdateInput\" type=\"number\" class=\"form-control\">\n" +
            "                <label for=\"FirstNameCreateInput\">City</label>\n" +
            "                <input required id=\"CityUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <input hidden required id=\"keyUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeUpdateRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickUpdateSavePerson('"+objName+"')\">Save</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n";
        let thisObj = this;
        this.containerID = containerID;
        $("html").append(dialogs);
        this.db = firebase.database();
        this.allPersons = [];
        this.displayPersons = [];
        this.sortField = null;
        this.isDescSort = false;
        this.filter = '';
        this.currentPAge = 0;
        this.displayPAgesCount = 0;
        this.rowsOnPAge = 5;
        this.maxDisplayPAges = 10;

        this.personFields = ['FirstName','LastName','City','Age'];

        this.personRef = this.db.ref('person');
        this.createInputFirstName = $('#FirstNameCreateInput');
        this.createInputLastName = $('#LastNameCreateInput');
        this.createInputAge = $('#AgeCreateInput');
        this.createInputCity = $('#CityCreateInput');

        this.updateInputFirstName = $('#FirstNameUpdateInput');
        this.updateInputLastName = $('#LastNameUpdateInput');
        this.updateInputAge = $('#AgeUpdateInput');
        this.updateInputCity = $('#CityUpdateInput');
        this.updateInputKey = $('#keyUpdateInput');

        this.personRef.on('child_added', function(data) {
            let newPerson = data.val();
            newPerson.key = data.key;
            thisObj.allPersons.push(newPerson);
            thisObj.refresh();
        });

        this.personRef.on('child_changed', function(data) {
            let newPerson = data.val();
            newPerson.key = data.key;
            let foundIndex = thisObj.allPersons.findIndex(function (item) {
                return item.key === data.key;
            });
            if(foundIndex !== -1)
            {
                thisObj.allPersons[foundIndex] = newPerson;
            }
            thisObj.refresh();
        });

        this.personRef.on('child_removed', function(data) {
            thisObj.allPersons = thisObj.allPersons.filter(function(item){
                return item.key !== data.key;
            });
            thisObj.refresh();
        });


        this.filterBy();
        this.sortByField();
        this.renderWidget();
    }

 createPerson(FirstName, LastName, Age, City) {
        let newUser = {
            FirstName : FirstName,
            LastName: LastName,
            Age : Age,
            City: City
        };
        this.db.ref('person').push(newUser);
    }

    updatePerson(key,FirstName, LastName, Age, City)
    {
        let newUser = {
            FirstName : FirstName,
            LastName: LastName,
            Age : Age,
            City: City
        };

        this.db.ref('person/'+key).set(newUser);
    }


    deletePerson(key)
    {
        this.db.ref('person/'+key).remove();
    }

   
    renderWidget()
    {
        let objectName = "dataTableExample";
        let container = $(this.containerID);
        container.html('');

        let searchDiv = $('<div class="form-group row" style="margin: 20px 10px 10px 10px">');
        searchDiv.append('<label for="searchInput" class="col-sm-1 col-form-label">Search</label>');
        searchDiv.append(
            $('<div class="col-sm-4">').append(
                $('<input id="searchInput" class="form-control" onchange="onClickFilter(\''+objectName+'\');">').val(this.filter)
            )
        );
        container.append(searchDiv);
        container.append($('<div>').text('Count of rows: ' + this.displayPersons.length));
        let tableHtml = $('<table class="table table-striped">');
        //headers
        let header = $('<tr>');
        header.append($('<th>').html('<i class="fas fa-trash"></i>'));
        header.append($('<th>').html('<i class="fas fa-edit"></i>'));
        header.append($('<th>').text('№'));
        for(let i =0;i<this.personFields.length;i++)
        {
            let a = $('<a href="#">').click({param1:objectName},onClickSortByField).text(this.personFields[i]);
            if(this.personFields[i] === this.sortField)
            {
                a = $('<b>').append(a).append(this.isDescSort?' <i class="fas fa-long-arrow-alt-down"></i>':' <i class="fas fa-long-arrow-alt-up"></i>');
            }else{
                a = $('<span>').append(a).append(' <i class="fas fa-arrows-alt-v" style="color: rgba(133,133,133,0.31)"></i>');
            }
            header.append($('<th>').append(a))
        }
        tableHtml.append(header);

        //table data
        let firstDisplayI = (this.currentPAge) * this.rowsOnPAge;
        let lastDisplayI = ((this.currentPAge) * this.rowsOnPAge + this.rowsOnPAge < this.displayPersons.length)? (this.currentPAge) * this.rowsOnPAge + this.rowsOnPAge: this.displayPersons.length;
        for(let i =  firstDisplayI;i<lastDisplayI;i++)
        {
            let rowHtml = $('<tr>');
            rowHtml.append($('<td>').html('<input type="checkbox" name="type" value="'+this.displayPersons[i].key+'" />'));
            rowHtml.append($('<td>').append($('<a href="#" class="fas fa-pen">').click({param1:i,param2:objectName},onClickUpdatePerson)));
            rowHtml.append($('<td>').text(i));
            for(let j =0;j<this.personFields.length;j++)
            {
                rowHtml.append(
                    $('<td>').text(this.displayPersons[i][this.personFields[j]])
                );
            }
            rowHtml.append( $('<td id="key' + i + '" hidden>').text(this.displayPersons[i].key));
            tableHtml.append(rowHtml);
        }
        container.append(tableHtml);
        //pAges buttons
        let pagination = $('<div class="col-md-12" style="margin: 10px">');
        let allPAgesCount = Math.ceil((this.displayPersons.length ) / this.rowsOnPAge);
        this.displayPAgesCount = (allPAgesCount > this.maxDisplayPAges)? this.maxDisplayPAges : allPAgesCount;
        let firstDisplayPAge = 0;
        let lastDisplayPAge = this.displayPAgesCount;
        if(allPAgesCount > this.maxDisplayPAges)
        {
            if(this.currentPAge - Math.trunc(this.maxDisplayPAges/2) < 0)
            {
                firstDisplayPAge = 0;
                lastDisplayPAge = this.maxDisplayPAges;
            }
            else if(this.currentPAge + Math.trunc(this.maxDisplayPAges/2) > allPAgesCount)
            {
                firstDisplayPAge = allPAgesCount - 10;
                lastDisplayPAge = allPAgesCount;
            }else{
                firstDisplayPAge = this.currentPAge - Math.trunc(this.maxDisplayPAges/2);
                lastDisplayPAge = this.currentPAge + Math.trunc(this.maxDisplayPAges/2);
            }
        }

        for(let i = firstDisplayPAge;i<lastDisplayPAge;i++)
        {
            let enable = 'enable';
            if(i === this.currentPAge)
                enable = 'disabled';
            let button = $('<button ' + enable +' class="btn btn-sm btn-info" style="margin: 2px 10px 10px 0; width: 40px; height: 40px;">').text(i+1);
            button.click({param1:objectName},onSwitchPAgeClick);
            pagination.append(button);
        }
        container.append(pagination);
        //control buttons
        let controlPanel = $('<div style="margin: 20px 20px 20px 20px">');
        controlPanel.append($('<button  type="button" class="btn btn-primary btn-block mar-top-30"  data-toggle="modal" data-target="#addRowModal" style=" margin-left: 1px">').text('Create'));
        controlPanel.append($('<button class="btn btn-primary btn-block mar-top-30" data-toggle="modal" data-target="#deleteRowsModal" style=" margin-left: 1px ;">').text('Delete Selected'));
        controlPanel.append($('<button class="btn btn-primary btn-block mar-top-30" style=" margin-left: 1px ;">').text('Refresh').click(function (objName) {window[objName].refresh();}));
        controlPanel.append($('<button hidden id="updateButton" data-toggle="modal" data-target="#updateRowModal">').text('Update'));
        container.append(controlPanel);

    }
    refresh() {
        this.filterBy();
        this.sortByField();
        this.renderWidget();
    }

    sortByField()
    {
        if(this.sortField !== null)
        {
            if(typeof this.allPersons[0][this.sortField] === "number")
            {
                if(this.isDescSort)
                {
                    this.displayPersons = this.displayPersons.sort((a,b) =>{
                        return a[this.sortField] - b[this.sortField];
                    });
                }else{
                    this.displayPersons = this.displayPersons.sort((a,b) => {
                        return b[this.sortField] - a[this.sortField];
                    });
                }

            }else{
                if(this.isDescSort)
                {
                    this.displayPersons = this.displayPersons.sort((a,b) => {
                        return -a[this.sortField].localeCompare(b[this.sortField])
                    });
                }else{
                    this.displayPersons = this.displayPersons.sort( (a,b)=>{

                        return a[this.sortField].localeCompare(b[this.sortField])
                    });
                }

            }

        }
    }

    filterBy()
    {
        if(this.filter !== '')
        {
            this.displayPersons = this.allPersons.filter( (value)=>{
                return value.City.indexOf(this.filter) !== -1
                    || value.FirstName.indexOf(this.filter) !== -1
                    || value.LastName.indexOf(this.filter) !== -1
                    || (value.Age+'').indexOf(this.filter) !== -1
            });
        }else
            this.displayPersons = this.allPersons.slice(0);
    }
}

function onSwitchPAgeClick(objName)
{
    let datatableonj = window[objName.data.param1];
    datatableonj.currentPAge = parseInt(this.innerText) - 1;
    console.log(this);
    datatableonj.renderWidget();
}

function onClickFilter(objName)
{
    let datatableonj = window[objName];
    datatableonj.filter = $('#searchInput').val();
    console.log(datatableonj.filter);
    datatableonj.filterBy();
    datatableonj.renderWidget();
}
function onClickSortByField(objName)
{
    let datatableonj = window[objName.data.param1];
    let oldSortField = datatableonj.sortField;
    datatableonj.sortField = this.innerText;
    if(oldSortField === datatableonj.sortField) {
        datatableonj.isDescSort = !datatableonj.isDescSort;
    }else{
        datatableonj.isDescSort = false;
    }
    datatableonj.sortByField();
    datatableonj.renderWidget();
}

function onClickCreatePerson(objName)
{
    let datatableonj = window[objName];
    let FirstName = datatableonj.createInputFirstName.val();
    let LastName = datatableonj.createInputLastName.val();
    let Age = datatableonj.createInputAge.val();
    let City = datatableonj.createInputCity.val();
    if(FirstName === '' || LastName === '' || Age === '' || City === '')
        return;
    datatableonj.createPerson(FirstName,LastName,parseInt(Age),City);

    $('#closeAddRowModal').click();

    datatableonj.createInputFirstName.val('');
    datatableonj.createInputLastName.val('');
    datatableonj.createInputAge.val('');
    datatableonj.createInputCity.val('');

}

function onClickDeletePerson(objName) {
    let datatableonj = window[objName];
    let selected = [];

    $("input:checkbox[name=type]:checked").each(function() {
        selected.push($(this).val());
    });
    selected.forEach(function (value) {
        datatableonj.deletePerson(value);
    });
    $('#closeDeleteRowsModalModal').click();
}

function onClickUpdatePerson(event) {
    let index = event.data.param1;
    let datatableonj = window[event.data.param2];
    $('#updateButton').click();
    datatableonj.updateInputFirstName.val(datatableonj.displayPersons[index].FirstName);
    datatableonj.updateInputLastName.val(datatableonj.displayPersons[index].LastName);
    datatableonj.updateInputAge.val(datatableonj.displayPersons[index].Age);
    datatableonj.updateInputCity.val(datatableonj.displayPersons[index].City);
    datatableonj.updateInputKey.val(datatableonj.displayPersons[index].key);
}

function onClickUpdateSavePerson(objName) {
    let datatableonj = window[objName];
    let FirstName = datatableonj.updateInputFirstName.val();
    let LastName = datatableonj.updateInputLastName.val();
    let Age = datatableonj.updateInputAge.val();
    let City = datatableonj.updateInputCity.val();
    let key = datatableonj.updateInputKey.val();

    if(FirstName === '' || LastName === '' || Age === '' || City === '')
        return;
    datatableonj.updatePerson(key,FirstName,LastName,parseInt(Age),City);

    $('#closeUpdateRowModal').click();

    datatableonj.updateInputFirstName.val('');
    datatableonj.updateInputLastName.val('');
    datatableonj.updateInputAge.val('');
    datatableonj.updateInputCity.val('');
}