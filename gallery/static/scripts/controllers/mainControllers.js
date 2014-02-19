var controllers = angular.module('ScaffoldsApp.controllers', []);

// Main Controller makes the call to the queryService to retrieve game data
// Returned data is passed to the controller scope
controllers.controller('MainCtrl', function($scope, queryService, $http, filterService) {

	// hides the teambox directives until data has been fetched
	$scope.display = false;
	$scope.default = true;

	$scope.loaded = {};

	$scope.weekList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];


	// WaPo Sports API is poorly documented so unfortunately the game codes had
	// to be hard-coded. The game codes are of the format YYYYMMDDxxx, where the
	// value of xxx isn't explained and isn't intuitive.
	$scope.games = [
		[
		{'HOME': 'Den', 'AWAY': 'Bal', 'CODE': '20130905007'},
		{'HOME': 'NO', 'AWAY': 'Atl', 'CODE': '20130908018'},
		{'HOME': 'Jac', 'AWAY': 'KC', 'CODE': '20130908030'},
		{'HOME': 'Det', 'AWAY': 'Min', 'CODE': '20130908008'},
		{'HOME': 'Car', 'AWAY': 'Sea', 'CODE': '20130908029'},
		{'HOME': 'Cle', 'AWAY': 'Mia', 'CODE': '20130908005'},
		{'HOME': 'Ind', 'AWAY': 'Oak', 'CODE': '20130908011'},
		{'HOME': 'Pit', 'AWAY': 'Ten', 'CODE': '20130908023'},
		{'HOME': 'Ind', 'AWAY': 'Oak', 'CODE': '20130908011'},
		{'HOME': 'Pit', 'AWAY': 'Ten', 'CODE': '20130908023'},
		{'HOME': 'Chi', 'AWAY': 'Cin', 'CODE': '20130908003'},
		{'HOME': 'StL', 'AWAY': 'Ari', 'CODE': '20130908014'},
		{'HOME': 'SF', 'AWAY': 'GB', 'CODE': '20130908025'},
		{'HOME': 'Dal', 'AWAY': 'NYG', 'CODE': '20130908006'},
		{'HOME': 'Was', 'AWAY': 'Phi', 'CODE': '20130909028'},
		{'HOME': 'SD', 'AWAY': 'Hou', 'CODE': '20130909024'}],
		[
		{'HOME': 'NE', 'AWAY': 'NYJ', 'CODE': '20130912017'},
		{'HOME': 'Buf', 'AWAY': 'Car', 'CODE': '20130915002'},
		{'HOME': 'Ind', 'AWAY': 'Mia', 'CODE': '20130915011'},
		{'HOME': 'KC', 'AWAY': 'Dal', 'CODE': '20130915012'},
		{'HOME': 'GB', 'AWAY': 'Was', 'CODE': '20130915009'},
		{'HOME': 'Chi', 'AWAY': 'Min', 'CODE': '20130915003'},
		{'HOME': 'Phi', 'AWAY': 'SD', 'CODE': '20130915021'},
		{'HOME': 'Bal', 'AWAY': 'Cle', 'CODE': '20130915033'},
		{'HOME': 'Phi', 'AWAY': 'SD', 'CODE': '20130915021'},
		{'HOME': 'Bal', 'AWAY': 'Cle', 'CODE': '20130915033'},
		{'HOME': 'TB', 'AWAY': 'NO', 'CODE': '20130915027'},
		{'HOME': 'Ari', 'AWAY': 'Det', 'CODE': '20130915022'},
		{'HOME': 'NYG', 'AWAY': 'Den', 'CODE': '20130915019'},
		{'HOME': 'Oak', 'AWAY': 'Jac', 'CODE': '20130915013'},
		{'HOME': 'Sea', 'AWAY': 'SF', 'CODE': '20130915026'},
		{'HOME': 'Cin', 'AWAY': 'Pit', 'CODE': '20130916004'}],
		[
		{'HOME': 'Phi', 'AWAY': 'KC', 'CODE': '20130919021'},
		{'HOME': 'Was', 'AWAY': 'Det', 'CODE': '20130922028'},
		{'HOME': 'NO', 'AWAY': 'Ari', 'CODE': '20130922018'},
		{'HOME': 'Min', 'AWAY': 'Cle', 'CODE': '20130922016'},
		{'HOME': 'Cin', 'AWAY': 'GB', 'CODE': '20130922004'},
		{'HOME': 'Bal', 'AWAY': 'Hou', 'CODE': '20130922033'},
		{'HOME': 'Car', 'AWAY': 'NYG', 'CODE': '20130922029'},
		{'HOME': 'NE', 'AWAY': 'TB', 'CODE': '20130922017'},
		{'HOME': 'NE', 'AWAY': 'TB', 'CODE': '20130922017'},
		{'HOME': 'Ten', 'AWAY': 'SD', 'CODE': '20130922010'},
		{'HOME': 'Mia', 'AWAY': 'Atl', 'CODE': '20130922015'},
		{'HOME': 'SF', 'AWAY': 'Ind', 'CODE': '20130922025'},
		{'HOME': 'NYJ', 'AWAY': 'Buf', 'CODE': '20130922020'},
		{'HOME': 'Sea', 'AWAY': 'Jac', 'CODE': '20130922026'},
		{'HOME': 'Pit', 'AWAY': 'Chi', 'CODE': '20130922023'},
		{'HOME': 'Den', 'AWAY': 'Oak', 'CODE': '20130923007'}],
		[
		{'HOME': 'StL', 'AWAY': 'SF', 'CODE': '20130926014'},
		{'HOME': 'TB', 'AWAY': 'Ari', 'CODE': '20130929027'},
		{'HOME': 'Hou', 'AWAY': 'Sea', 'CODE': '20130929034'},
		{'HOME': 'Buf', 'AWAY': 'Bal', 'CODE': '20130929002'},
		{'HOME': 'Det', 'AWAY': 'Chi', 'CODE': '20130929008'},
		{'HOME': 'Min', 'AWAY': 'Pit', 'CODE': '20130929016'},
		{'HOME': 'KC', 'AWAY': 'NYG', 'CODE': '20130929012'},
		{'HOME': 'Cle', 'AWAY': 'Cin', 'CODE': '20130929005'},
		{'HOME': 'Cle', 'AWAY': 'Cin', 'CODE': '20130929005'},
		{'HOME': 'Ten', 'AWAY': 'NYJ', 'CODE': '20130929010'},
		{'HOME': 'SD', 'AWAY': 'Dal', 'CODE': '20130929024'},
		{'HOME': 'Oak', 'AWAY': 'Was', 'CODE': '20130929013'},
		{'HOME': 'Den', 'AWAY': 'Phi', 'CODE': '20130929007'},
		{'HOME': 'Atl', 'AWAY': 'NE', 'CODE': '20130929001'},
		{'HOME': 'NO', 'AWAY': 'Mia', 'CODE': '20130930018'}],
		[
		{'HOME': 'Cle', 'AWAY': 'Buf', 'CODE': '20131003005'},
		{'HOME': 'Cin', 'AWAY': 'NE', 'CODE': '20131006004'},
		{'HOME': 'Ten', 'AWAY': 'KC', 'CODE': '20131006010'},
		{'HOME': 'Chi', 'AWAY': 'NO', 'CODE': '20131006003'},
		{'HOME': 'Mia', 'AWAY': 'Bal', 'CODE': '20131006015'},
		{'HOME': 'StL', 'AWAY': 'Jac', 'CODE': '20131006014'},
		{'HOME': 'NYG', 'AWAY': 'Phi', 'CODE': '20131006019'},
		{'HOME': 'Ind', 'AWAY': 'Sea', 'CODE': '20131006011'},
		{'HOME': 'GB', 'AWAY': 'Det', 'CODE': '20131006009'},
		{'HOME': 'Ari', 'AWAY': 'Car', 'CODE': '20131006022'},
		{'HOME': 'Dal', 'AWAY': 'Den', 'CODE': '20131006006'},
		{'HOME': 'SF', 'AWAY': 'Hou', 'CODE': '20131006025'},
		{'HOME': 'Oak', 'AWAY': 'SD', 'CODE': '20131006013'},
		{'HOME': 'Atl', 'AWAY': 'NYJ', 'CODE': '20131007001'}],
		[
		{'HOME': 'Chi', 'AWAY': 'NYG', 'CODE': '20131010003'},
		{'HOME': 'Min', 'AWAY': 'Car', 'CODE': '20131013016'},
		{'HOME': 'Bal', 'AWAY': 'GB', 'CODE': '20131013033'},
		{'HOME': 'Cle', 'AWAY': 'Det', 'CODE': '20131013005'},
		{'HOME': 'NYJ', 'AWAY': 'Pit', 'CODE': '20131013020'},
		{'HOME': 'Hou', 'AWAY': 'StL', 'CODE': '20131013034'},
		{'HOME': 'Bal', 'AWAY': 'GB', 'CODE': '20131013033'},
		{'HOME': 'TB', 'AWAY': 'Phi', 'CODE': '20131013027'},
		{'HOME': 'KC', 'AWAY': 'Oak', 'CODE': '20131013012'},
		{'HOME': 'Sea', 'AWAY': 'Ten', 'CODE': '20131013026'},
		{'HOME': 'Den', 'AWAY': 'Jac', 'CODE': '20131013007'},
		{'HOME': 'SF', 'AWAY': 'Ari', 'CODE': '20131013025'},
		{'HOME': 'NE', 'AWAY': 'NO', 'CODE': '20131013017'},
		{'HOME': 'Dal', 'AWAY': 'Was', 'CODE': '20131013006'},
		{'HOME': 'SD', 'AWAY': 'Ind', 'CODE': '20131014024'}],
		[
		{'HOME': 'Ari', 'AWAY': 'Sea', 'CODE': '20131017022'},
		{'HOME': 'Phi', 'AWAY': 'Dal', 'CODE': '20131020021'},
		{'HOME': 'Atl', 'AWAY': 'TB', 'CODE': '20131020001'},
		{'HOME': 'Was', 'AWAY': 'Chi', 'CODE': '20131020028'},
		{'HOME': 'Mia', 'AWAY': 'Buf', 'CODE': '20131020015'},
		{'HOME': 'Det', 'AWAY': 'Cin', 'CODE': '20131020008'},
		{'HOME': 'Atl', 'AWAY': 'TB', 'CODE': '20131020001'},
		{'HOME': 'Was', 'AWAY': 'Chi', 'CODE': '20131020028'},
		{'HOME': 'Jac', 'AWAY': 'SD', 'CODE': '20131020030'},
		{'HOME': 'Ten', 'AWAY': 'SF', 'CODE': '20131020010'},
		{'HOME': 'GB', 'AWAY': 'Cle', 'CODE': '20131020009'},
		{'HOME': 'KC', 'AWAY': 'Hou', 'CODE': '20131020012'},
		{'HOME': 'KC', 'AWAY': 'Hou', 'CODE': '20131020012'},
		{'HOME': 'Ind', 'AWAY': 'Den', 'CODE': '20131020011'},
		{'HOME': 'NYG', 'AWAY': 'Min', 'CODE': '20131021019'}],
		[
		{'HOME': 'TB', 'AWAY': 'Car', 'CODE': '20131024027'},
		{'HOME': 'NE', 'AWAY': 'Mia', 'CODE': '20131027017'},
		{'HOME': 'NO', 'AWAY': 'Buf', 'CODE': '20131027018'},
		{'HOME': 'Jac', 'AWAY': 'SF', 'CODE': '20131027030'},
		{'HOME': 'Phi', 'AWAY': 'NYG', 'CODE': '20131027021'},
		{'HOME': 'Phi', 'AWAY': 'NYG', 'CODE': '20131027021'},
		{'HOME': 'Det', 'AWAY': 'Dal', 'CODE': '20131027008'},
		{'HOME': 'Oak', 'AWAY': 'Pit', 'CODE': '20131027013'},
		{'HOME': 'Cin', 'AWAY': 'NYJ', 'CODE': '20131027004'},
		{'HOME': 'Den', 'AWAY': 'Was', 'CODE': '20131027007'},
		{'HOME': 'Ari', 'AWAY': 'Atl', 'CODE': '20131027022'},
		{'HOME': 'Min', 'AWAY': 'GB', 'CODE': '20131027016'},
		{'HOME': 'StL', 'AWAY': 'Sea', 'CODE': '20131028014'}],
		[
		{'HOME': 'Mia', 'AWAY': 'Cin', 'CODE': '20131031015'},
		{'HOME': 'StL', 'AWAY': 'Ten', 'CODE': '20131103014'},
		{'HOME': 'Buf', 'AWAY': 'KC', 'CODE': '20131103002'},
		{'HOME': 'NYJ', 'AWAY': 'NO', 'CODE': '20131103020'},
		{'HOME': 'Car', 'AWAY': 'Atl', 'CODE': '20131103029'},
		{'HOME': 'Was', 'AWAY': 'SD', 'CODE': '20131103028'},
		{'HOME': 'Dal', 'AWAY': 'Min', 'CODE': '20131103006'},
		{'HOME': 'Sea', 'AWAY': 'TB', 'CODE': '20131103026'},
		{'HOME': 'Oak', 'AWAY': 'Phi', 'CODE': '20131103013'},
		{'HOME': 'Cle', 'AWAY': 'Bal', 'CODE': '20131103005'},
		{'HOME': 'NE', 'AWAY': 'Pit', 'CODE': '20131103017'},
		{'HOME': 'Hou', 'AWAY': 'Ind', 'CODE': '20131103034'},
		{'HOME': 'GB', 'AWAY': 'Chi', 'CODE': '20131104009'}],
		[
		{'HOME': 'Min', 'AWAY': 'Was', 'CODE': '20131107016'},
		{'HOME': 'Ten', 'AWAY': 'Jac', 'CODE': '20131110010'},
		{'HOME': 'GB', 'AWAY': 'Phi', 'CODE': '20131110009'},
		{'HOME': 'Atl', 'AWAY': 'Sea', 'CODE': '20131110001'},
		{'HOME': 'NYG', 'AWAY': 'Oak', 'CODE': '20131110019'},
		{'HOME': 'Chi', 'AWAY': 'Det', 'CODE': '20131110003'},
		{'HOME': 'Bal', 'AWAY': 'Cin', 'CODE': '20131110033'},
		{'HOME': 'Ind', 'AWAY': 'StL', 'CODE': '20131110011'},
		{'HOME': 'Pit', 'AWAY': 'Buf', 'CODE': '20131110023'},
		{'HOME': 'SF', 'AWAY': 'Car', 'CODE': '20131110025'},
		{'HOME': 'Ari', 'AWAY': 'Hou', 'CODE': '20131110022'},
		{'HOME': 'SD', 'AWAY': 'Den', 'CODE': '20131110024'},
		{'HOME': 'NO', 'AWAY': 'Dal', 'CODE': '20131110018'},
		{'HOME': 'TB', 'AWAY': 'Mia', 'CODE': '20131111027'}],
		[
		{'HOME': 'Ten', 'AWAY': 'Ind', 'CODE': '20131114010'},
		{'HOME': 'Jac', 'AWAY': 'Ari', 'CODE': '20131117030'},
		{'HOME': 'Pit', 'AWAY': 'Det', 'CODE': '20131117023'},
		{'HOME': 'Phi', 'AWAY': 'Was', 'CODE': '20131117021'},
		{'HOME': 'Buf', 'AWAY': 'NYJ', 'CODE': '20131117002'},
		{'HOME': 'Chi', 'AWAY': 'Bal', 'CODE': '20131117003'},
		{'HOME': 'TB', 'AWAY': 'Atl', 'CODE': '20131117027'},
		{'HOME': 'Hou', 'AWAY': 'Oak', 'CODE': '20131117034'},
		{'HOME': 'Cin', 'AWAY': 'Cle', 'CODE': '20131117004'},
		{'HOME': 'Mia', 'AWAY': 'SD', 'CODE': '20131117015'},
		{'HOME': 'NYG', 'AWAY': 'GB', 'CODE': '20131117019'},
		{'HOME': 'NO', 'AWAY': 'SF', 'CODE': '20131117018'},
		{'HOME': 'Sea', 'AWAY': 'Min', 'CODE': '20131117026'},
		{'HOME': 'Den', 'AWAY': 'KC', 'CODE': '20131117007'},
		{'HOME': 'Car', 'AWAY': 'NE', 'CODE': '20131118029'}],
		[
		{'HOME': 'Atl', 'AWAY': 'NO', 'CODE': '20131121001'},
		{'HOME': 'GB', 'AWAY': 'Min', 'CODE': '20131124009'},
		{'HOME': 'KC', 'AWAY': 'SD', 'CODE': '20131124012'},
		{'HOME': 'Bal', 'AWAY': 'NYJ', 'CODE': '20131124033'},
		{'HOME': 'Cle', 'AWAY': 'Pit', 'CODE': '20131124005'},
		{'HOME': 'StL', 'AWAY': 'Chi', 'CODE': '20131124014'},
		{'HOME': 'Mia', 'AWAY': 'Car', 'CODE': '20131124015'},
		{'HOME': 'Hou', 'AWAY': 'Jac', 'CODE': '20131124034'},
		{'HOME': 'Det', 'AWAY': 'TB', 'CODE': '20131124008'},
		{'HOME': 'Ari', 'AWAY': 'Ind', 'CODE': '20131124022'},
		{'HOME': 'Oak', 'AWAY': 'Ten', 'CODE': '20131124013'},
		{'HOME': 'NYG', 'AWAY': 'Dal', 'CODE': '20131124019'},
		{'HOME': 'NE', 'AWAY': 'Den', 'CODE': '20131124017'},
		{'HOME': 'Was', 'AWAY': 'SF', 'CODE': '20131125028'}],
		[
		{'HOME': 'Det', 'AWAY': 'GB', 'CODE': '20131128008'},
		{'HOME': 'Dal', 'AWAY': 'Oak', 'CODE': '20131128006'},
		{'HOME': 'Bal', 'AWAY': 'Pit', 'CODE': '20131128033'},
		{'HOME': 'Hou', 'AWAY': 'NE', 'CODE': '20131201034'},
		{'HOME': 'Cle', 'AWAY': 'Jac', 'CODE': '20131201005'},
		{'HOME': 'NYJ', 'AWAY': 'Mia', 'CODE': '20131201020'},
		{'HOME': 'Ind', 'AWAY': 'Ten', 'CODE': '20131201011'},
		{'HOME': 'Car', 'AWAY': 'TB', 'CODE': '20131201029'},
		{'HOME': 'Min', 'AWAY': 'Chi', 'CODE': '20131201016'},
		{'HOME': 'Phi', 'AWAY': 'Ari', 'CODE': '20131201021'},
		{'HOME': 'SF', 'AWAY': 'StL', 'CODE': '20131201025'},
		{'HOME': 'Buf', 'AWAY': 'Atl', 'CODE': '20131201002'},
		{'HOME': 'SD', 'AWAY': 'Cin', 'CODE': '20131201024'},
		{'HOME': 'KC', 'AWAY': 'Den', 'CODE': '20131201012'},
		{'HOME': 'Was', 'AWAY': 'NYG', 'CODE': '20131201028'},
		{'HOME': 'Sea', 'AWAY': 'NO', 'CODE': '20131202026'}],
		[
		{'HOME': 'Jac', 'AWAY': 'Hou', 'CODE': '20131205030'},
		{'HOME': 'NYJ', 'AWAY': 'Oak', 'CODE': '20131208020'},
		{'HOME': 'TB', 'AWAY': 'Buf', 'CODE': '20131208027'},
		{'HOME': 'Pit', 'AWAY': 'Mia', 'CODE': '20131208023'},
		{'HOME': 'Phi', 'AWAY': 'Det', 'CODE': '20131208021'},
		{'HOME': 'Cin', 'AWAY': 'Ind', 'CODE': '20131208004'},
		{'HOME': 'Bal', 'AWAY': 'Min', 'CODE': '20131208033'},
		{'HOME': 'GB', 'AWAY': 'Atl', 'CODE': '20131208009'},
		{'HOME': 'NE', 'AWAY': 'Cle', 'CODE': '20131208017'},
		{'HOME': 'Was', 'AWAY': 'KC', 'CODE': '20131208028'},
		{'HOME': 'Den', 'AWAY': 'Ten', 'CODE': '20131208007'},
		{'HOME': 'Ari', 'AWAY': 'StL', 'CODE': '20131208022'},
		{'HOME': 'SF', 'AWAY': 'Sea', 'CODE': '20131208025'},
		{'HOME': 'SD', 'AWAY': 'NYG', 'CODE': '20131208024'},
		{'HOME': 'NO', 'AWAY': 'Car', 'CODE': '20131208018'},
		{'HOME': 'Chi', 'AWAY': 'Dal', 'CODE': '20131209003'}],
		[
		{'HOME': 'Den', 'AWAY': 'SD', 'CODE': '20131212007'},
		{'HOME': 'NYG', 'AWAY': 'Sea', 'CODE': '20131215019'},
		{'HOME': 'Ind', 'AWAY': 'Hou', 'CODE': '20131215011'},
		{'HOME': 'Cle', 'AWAY': 'Chi', 'CODE': '20131215005'},
		{'HOME': 'Min', 'AWAY': 'Phi', 'CODE': '20131215016'},
		{'HOME': 'Atl', 'AWAY': 'Was', 'CODE': '20131215001'},
		{'HOME': 'Mia', 'AWAY': 'NE', 'CODE': '20131215015'},
		{'HOME': 'TB', 'AWAY': 'SF', 'CODE': '20131215027'},
		{'HOME': 'Jac', 'AWAY': 'Buf', 'CODE': '20131215030'},
		{'HOME': 'Oak', 'AWAY': 'KC', 'CODE': '20131215013'},
		{'HOME': 'Car', 'AWAY': 'NYJ', 'CODE': '20131215029'},
		{'HOME': 'Dal', 'AWAY': 'GB', 'CODE': '20131215006'},
		{'HOME': 'Ten', 'AWAY': 'Ari', 'CODE': '20131215010'},
		{'HOME': 'StL', 'AWAY': 'NO', 'CODE': '20131215014'},
		{'HOME': 'Pit', 'AWAY': 'Cin', 'CODE': '20131215023'},
		{'HOME': 'Det', 'AWAY': 'Bal', 'CODE': '20131216008'}],
		[
		{'HOME': 'StL', 'AWAY': 'TB', 'CODE': '20131222014'},
		{'HOME': 'Jac', 'AWAY': 'Ten', 'CODE': '20131222030'},
		{'HOME': 'KC', 'AWAY': 'Ind', 'CODE': '20131222012'},
		{'HOME': 'Car', 'AWAY': 'NO', 'CODE': '20131222029'},
		{'HOME': 'Cin', 'AWAY': 'Min', 'CODE': '20131222004'},
		{'HOME': 'Buf', 'AWAY': 'Mia', 'CODE': '20131222002'},
		{'HOME': 'Hou', 'AWAY': 'Den', 'CODE': '20131222034'},
		{'HOME': 'NYJ', 'AWAY': 'Cle', 'CODE': '20131222020'},
		{'HOME': 'Was', 'AWAY': 'Dal', 'CODE': '20131222028'},
		{'HOME': 'Det', 'AWAY': 'NYG', 'CODE': '20131222008'},
		{'HOME': 'Sea', 'AWAY': 'Ari', 'CODE': '20131222026'},
		{'HOME': 'SD', 'AWAY': 'Oak', 'CODE': '20131222024'},
		{'HOME': 'Bal', 'AWAY': 'NE', 'CODE': '20131222033'},
		{'HOME': 'GB', 'AWAY': 'Pit', 'CODE': '20131222009'},
		{'HOME': 'Phi', 'AWAY': 'Chi', 'CODE': '20131222021'},
		{'HOME': 'SF', 'AWAY': 'Atl', 'CODE': '20131223025'}],
		[
		{'HOME': 'Ten', 'AWAY': 'Hou', 'CODE': '20131229010'},
		{'HOME': 'Min', 'AWAY': 'Det', 'CODE': '20131229016'},
		{'HOME': 'Atl', 'AWAY': 'Car', 'CODE': '20131229001'},
		{'HOME': 'NYG', 'AWAY': 'Was', 'CODE': '20131229019'},
		{'HOME': 'Ind', 'AWAY': 'Jac', 'CODE': '20131229011'},
		{'HOME': 'Mia', 'AWAY': 'NYJ', 'CODE': '20131229015'},
		{'HOME': 'Cin', 'AWAY': 'Bal', 'CODE': '20131229004'},
		{'HOME': 'Pit', 'AWAY': 'Cle', 'CODE': '20131229023'},
		{'HOME': 'NO', 'AWAY': 'TB', 'CODE': '20131229018'},
		{'HOME': 'Ari', 'AWAY': 'SF', 'CODE': '20131229022'},
		{'HOME': 'SD', 'AWAY': 'KC', 'CODE': '20131229024'},
		{'HOME': 'NE', 'AWAY': 'Buf', 'CODE': '20131229017'},
		{'HOME': 'Oak', 'AWAY': 'Den', 'CODE': '20131229013'},
		{'HOME': 'Chi', 'AWAY': 'GB', 'CODE': '20131229003'},
		{'HOME': 'Sea', 'AWAY': 'StL', 'CODE': '20131229026'},
		{'HOME': 'Dal', 'AWAY': 'Phi', 'CODE': '20131229006'}]
	];
	
	// listens for rootScope broadcast announcing data has been fetched
	$scope.$on('fetched', function() {
		$scope.loaded = queryService.returned;
		$scope.display = true;
		$scope.default = false;
	})

	$scope.currentWeek = 1;

	$scope.week = $scope.games[$scope.currentWeek];
	
	$scope.$on('changeWeek', function() {
		$scope.currentWeek = filterService.value;
		$scope.week = $scope.games[$scope.currentWeek];
	})
	

})
