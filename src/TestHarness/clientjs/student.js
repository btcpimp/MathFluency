var GameControllerClient = require('./client/GameControllerClient').GameControllerClient;
var CLFlashGameEngine = require('./client/CLFlashGameEngine').CLFlashGameEngine;
var CLHTML5GameEngine = require('./client/CLHTML5GameEngine').CLHTML5GameEngine;
var ExtFlashGameEngine = require('./client/ExtFlashGameEngine').ExtFlashGameEngine;
var ExtHTML5GameEngine = require('./client/ExtHTML5GameEngine').ExtHTML5GameEngine;
var JavaGameEngine = require('./client/JavaGameEngine').JavaGameEngine;

var gc = new GameControllerClient('/api');
gc.registerEngineConstructor('CLFlashGameEngine', CLFlashGameEngine);
gc.registerEngineConstructor('CLHTML5GameEngine', CLHTML5GameEngine);
gc.registerEngineConstructor('ExtFlashGameEngine', ExtFlashGameEngine);
gc.registerEngineConstructor('ExtHTML5GameEngine', ExtHTML5GameEngine);
gc.registerEngineConstructor('JavaGameEngine', JavaGameEngine);

var instructionsURL;

$(document).ready(function ()
{
    $('#stage-list li button').button().click(function ()
    {
        var bvals = $(this).val().split('/',2);
        var seqID = bvals[0];
        var stageID = bvals[1];
        
        //HACK: Putting things on the window level is bad...
        window.runStage(seqID, stageID);
        window.currentStage = stageID;
        window.currentSequence = seqID;
    });
    
    $('#instructions-link').button().click(function ()
    {
        window.open(instructionsURL, 'Instructions', 'status=0,location=0,toolbar=0,scrollbars=yes,resizable=yes,width=600,height=500');
    });
    
    $('#instructor-dashboard-link').button();
});

//HACK: Putting things on the window level is bad...
window.runStage = function runStage( seqID, stageID )
{
    lock('Loading level ' + stageID + '...');
    gc.getStage( stageID, function (stage)
    {   
        gc.getSequence( seqID, function(sequence)
        {
            // Don't need to pass playerState since the server stores this in the session.
            stage.getNextQuestionSet(null, function (questionSet)
            {
                runQuestionSet(sequence, questionSet);
            });
        });
    });
}

function updateStageLocking( stages )
{
//    alert('looking at '+ stages.length +' stages');
    var buttons = $('#stage-list li button');
    for( var j = 0; j < buttons.length; j++ ){
        var bvals = buttons[j].value.split('/',2);
        var seqID = bvals[0];
        var stageID = bvals[1];
        for( var i = 0; i < stages.length; i++ ){
            if( stageID == stages[i].id ){
                $('#'+ stageID).button('option','disabled', stages[i].locked );
                break;
            }
        }
    }
}

function runQuestionSet( sequence, questionSet )
{
    if (!questionSet)
    {
        unlock();
        return;
    }
    
    statusMessage('Loading game engine for question set ' + questionSet.id + '...');
    gc.getGameEngineForQuestionSet(questionSet, null, function (engine)
    {
        statusMessage('Running game engine for question set ' + questionSet.id + '...');
        instructionsURL = 'instructions/' + questionSet.parent.id;
        var new_pos = $('#game-container').offset();
        window.scrollTo(new_pos.left,new_pos.top);
        
        engine.run(questionSet, $('#game-container'), function (xml)
        {
            statusMessage('Sending game data…');
            // clear the game container if not a CL game
            //if( ! questionSet.parent.isCLGame )
                $('#game-container').empty();
            gc.saveQuestionSetResults(null, sequence, questionSet, xml, function (error,stages)
            {
                unlock();
                if (error)
                {
                    alert('Error saving data: ' + error);
                    return;
                }
                updateStageLocking(stages);
            });
        });
    });
}

function lock(message)
{
    $(':input').attr('disabled', true);
    $('#instructions-link').attr('disabled', false).show('fast');
    statusMessage(message);
}

function unlock(message)
{
    $(':input').attr('disabled', false);
    $('#instructions-link').hide('fast');
    statusMessage(message);
}

function statusMessage(message)
{
    if (!message)
    {
        $('#status-message').hide('fast');
    }
    else
    {
        $('#status-message').html(message).show('fast');
    }
}
