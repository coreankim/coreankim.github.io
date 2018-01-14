var x = {
    "AGE_bin": 1,
    "FEMALE": 0,
    'Race': 0,
    'PAY1': 0,
    'HOSP_BEDSIZE': 0,
    'Hosp_locteach': 0,
    "other_variables": []
};
  
$('.gender').click(function() {
    var gender = $("input[name='gender']:checked").val();
    x['FEMALE'] = gender;
});

$("#age").change(function() {
    var age = $(this).val();
    if (age >= 80) {
        x["AGE_bin"] = 6;
        return
    }
    if (age >= 70) {
        x["AGE_bin"] = 5;
        return
    }
    if (age >= 60) {
        x["AGE_bin"] = 4;
        return
    }
    if (age >= 50) {
        x["AGE_bin"] = 3;
        return
    }
    if (age >= 40) {
        x["AGE_bin"] = 2;
        return
    }
    if (age >= 30) {
        x["AGE_bin"] = 1;
        return
    }
    if (age >= 18) {
        x["AGE_bin"] = 0;
        return
    }
});

$('.Race').click(function() {
    var Race = $(this).val();
    x['Race'] = Race;
});

$('.PAY1').click(function() {
    var PAY1 = $(this).val();
    x['PAY1'] = PAY1;
});

$('.HOSP_BEDSIZE').click(function() {
    var HOSP_BEDSIZE = $(this).val();
    x['HOSP_BEDSIZE'] = HOSP_BEDSIZE;
});

$('.Hosp_locteach').click(function() {
    var HOSP_BEDSIZE = $(this).val();
    x['HOSP_BEDSIZE'] = HOSP_BEDSIZE;
});

$('#add_variable').keypress(function(e) {
    if(e.which == 13) {
        var variable = $("#add_variable").val().trim();
        var variable_trim;
        if (variable.length == 3) {
            variable_trim = variable;
        } else {
            var match = /(\d|[a-z]|[A-z])(\d|[a-z]|[A-z])(\d|[a-z]|[A-z])\.(\d|[a-z]|[A-z])*/.exec(variable)
            if (match) {
                match = match[0].toString()
                if (match.length == variable.length) {
                    variable_trim = variable.replace(/\./g, '');
                    variable_trim = variable_trim.trim();
                } else {
                    alert(variable + ' is not valid!');
                }
            } else {
                alert(variable + ' is not valid!');
            }
        }
        var douplication = 0;
        if (variable_trim) {
            for (i in x['other_variables']) {
                if (variable_trim.toString() == x['other_variables'][i].toString()) {
                    douplication = 1;
                    break;
                }
            }
            if (douplication == 1) {
                alert(variable + ' is already added!')
            } else {
                var validCode;
                for (i in ICD9) {
                    if (variable_trim.toString() == ICD9[i].toString()) {
                        validCode = 1;
                        break;
                    }
                }
                if (!validCode) {
                    alert(variable + ' is not valid!');
                    return;
                }

                x['other_variables'].push(variable_trim);
                var id = variable_trim;
                var row = $('<tr>');
                var div = $('<td>');
                div.attr({"class": "variables", "id": id})
                div.append(variable + ": " + ICD9Obj[variable_trim]);
                div.data('variable', variable_trim);
                row.append(div)
                $('#v_list').append(row);
            };
        };
    };
});

$('#add').click(function() {

    var variable = $("#add_variable").val().trim();
    var variable_trim;
    if (variable.length == 3) {
        variable_trim = variable;
    } else {
        var match = /(\d|[a-z]|[A-z])(\d|[a-z]|[A-z])(\d|[a-z]|[A-z])\.(\d|[a-z]|[A-z])*/.exec(variable)
        if (match) {
            match = match[0].toString()
            if (match.length == variable.length) {
                variable_trim = variable.replace(/\./g, '');
                variable_trim = variable_trim.trim();
            } else {
                alert(variable + ' is not valid!');
            }
        } else {
            alert(variable + ' is not valid!');
        }
    }
    var douplication = 0;
    if (variable_trim) {
        for (i in x['other_variables']) {
            if (variable_trim.toString() == x['other_variables'][i].toString()) {
                douplication = 1;
                break;
            }
        }
        if (douplication == 1) {
            alert(variable + ' is already added!')
        } else {
            var validCode;
            for (i in ICD9) {
                if (variable_trim.toString() == ICD9[i].toString()) {
                    validCode = 1;
                    break;
                }
            }
            if (!validCode) {
                alert(variable + ' is not valid!');
                return;
            }

            x['other_variables'].push(variable_trim);
            var id = variable_trim;
            var row = $('<tr>');
            var div = $('<td>');
            div.attr({"class": "variables", "id": id})
            div.append(variable + ": " + ICD9Obj[variable_trim]);
            div.data('variable', variable_trim);
            row.append(div)
            $('#v_list').append(row);
        };
    };
});

$(document).on('click', '.variables', function() {
    
    var variable = $(this).data('variable');
    var index = x['other_variables'].indexOf(variable);
    if (index > -1) {
        x['other_variables'].splice(index, 1);
        $(this).remove();
    }
});

var url = "https://mortality-spinal-epidural.herokuapp.com/predict_probability";
// url = "http://127.0.0.1:5000/predict_probability";
$("#predict_btn").click(function() {

    // $('*').css('cursor','wait');
    var cursorDivRow = $("<div class='animationload'>");
    cursorDivRow.append('<div class="osahanloading"></div>')

    $('#calculator').append(cursorDivRow);

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(x),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function(data) {
            var output = data.result*100;
            output = round(output,1);
            $('#results').append('<h4>Mortality risk: '+output + '%</h4>');
            $(cursorDivRow).remove();            
        },
        error: function (textStatus, errorThrown) {
           $('#results').text('error'); 
           $(cursorDivRow).remove();
        },
    });
});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};
