"use strict";

var PlayerState = require('./PlayerState').PlayerState;

/*
    Class: GameController
    
    This is an abstract base class for a <GameController at http://fluencychallenge.com/wiki/DesignAndImplementation/GameController>.  It provides methods for loading and selecting game engines and stages.
    
    See:
        - <GameControllerClient>
*/
var GameController = exports.GameController = function GameController()
{
};

/*
    Method: getPlayerState
    
    Loads the current player state.  This method does not do any authorization; the application should perform authorization to verify that the caller has permission to view the player's state.
    
    Parameters:
        playerID - The unique ID for this player.
        callback - This gets called with the <PlayerState>.
*/
GameController.prototype.getPlayerState = function (playerID, callback)
{
    setTimeout(callback, 0, new PlayerState(playerID));
};

/*
    Method: savePlayerState
    
    Saves the player state.
    
    Parameters:
        playerState - The <PlayerState> to save.
        callback - This gets called with the <PlayerState> which may be updated during the save.
*/
GameController.prototype.savePlayerState = function (playerState, callback)
{
    setTimeout(callback, 0, playerState);
};

/*
    Method: getAvailableSequencesForPlayer
    
    Calls callback with the sequences from which the player can choose.
    
    Parameters:
        playerState - The current player state.
        callback - This gets called with an array of objects with keys:
                   'id', 'label', 'transitionFn', 'stages', 'locked'
*/
GameController.prototype.getAvailableSequencesForPlayer = function (playerState, callback)
{
    setTimeout(callback, 0, []);
};

/*
    Method: getAvailableStagesForPlayer
    
    Calls callback with the stages from which the player can choose.
    
    Parameters:
        playerState - The current player state.
        callback - This gets called with an array of objects with keys 'id' and 'displayName'.
*/
GameController.prototype.getAvailableStagesForPlayer = function (playerState, callback)
{
    setTimeout(callback, 0, []);
};


/*
    Method: getSequence
*/
GameController.prototype.getSequence = function (seqID, callback)
{
    setTimeout(callback, 0);
};


/*
    Method: getStage
    
    Loads a <Stage> with the given ID.
    
    Parameters:
        stageID - The stage ID.
        callback - This gets called with the <Stage>.
*/
GameController.prototype.getStage = function (stageID, callback)
{
    setTimeout(callback, 0);
};

/*
    Method: getGameEngineForQuestionSet
    
    Figures out which game engine can run the given question set.
    
    Parameters:
        questionSet - The question set that needs to be run.
        callback - This gets called with the appropriate game engine.
*/
GameController.prototype.getGameEngineForQuestionSet = function (questionSet, playerState, callback)
{
    setTimeout(callback, 0);
};

/*
    Method: getQuestionSetTransition
    
    Figures out whether the game should progress to the next question set in sequence
    Parameters: 
        questionSet - the question set just finished
        results - the xml output of the game engine
        callback - this gets called to launch the next question set in sequence
*/
GameController.prototype.getQuestionSetTransition = function (questionSet, results, callback)
{
    setTimeout(callback, 0);
};

/*
    Method: saveQuestionSetResults
    
    Stores the results for the given <PlayerState> and <QuestionSet>. The format of the results is TBD.
    
    Parameters:
        playerState - The <PlayerState> of the player who completed the question set.
        questionSet - The <QuestionSet> the player completed.
        results - TBD. Probably a string, dict, or a custom object.
        callback - The arguments to callback are TBD.
*/
GameController.prototype.saveQuestionSetResults = function (playerState, sequence, questionSet, results, callback)
{
    setTimeout(callback, 0);
};
