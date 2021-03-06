$(document).ready(function ()
{
    var here = window.location.pathname;
    if (here.charAt(here.length-1) != '/')
    {
        here = here + '/';
    }
        
    $('#confirm-button').button().click(submitStudents);
    
    function submitStudents()
    {
        $.post(window.FLUENCY.rootPath + '/instructor/roster-upload-confirm', window.FLUENCY.formData)
            .success(function (data)
            {
                window.location.href = window.FLUENCY.rootPath + '/instructor';
            })
            .error(function (jqXHR, statusText, errorThrown)
            {
                showErrors($.parseJSON(jqXHR.responseText).errors);
            })
            .complete(function ()
            {
                //unlock();
            });
    }
    
    function showErrors(errors)
    {
        $.each(errors, function (i, err)
        {
            return $('<li>').text(err).appendTo('#error-messages ol');
        });
        $('#error-messages').show('fast');
    }
});
