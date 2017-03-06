	
	var boxMaxWidth = boxMaxHeight = 40;
	var boxMinWidth = boxMinHeight = 30;

	var boxBackgrounds = ["green", "red", "blue", "black", "pink"];

	var boxContainer = [];

	var boxStartingCount = 5;
	var boxAdditionalMaxCount = 3;

	var boxMovement;
	var boxMovementHorizontal = boxMovementVertical = 10;

	var areaPosition = {};
	var areaSize = {};


	var gameTimer;
	var gameOver = false;


	function createBoxes(i)
	{
		
		for (var x = 0;x < parseInt(i); x++)
		{
			var div = $("<div></div>");

			var sizes = setBoxRandomSize(div);
			setBoxRandomPosition(div);
			setBoxRandomBackground(div);
				
			var date = new Date();
			var id = new String(""+sizes.height+""+date.getTime()+"");

			div.attr("id", id);

			boxContainer[id] = [];

			var arrow = Math.floor(2*Math.random())+1;
			boxContainer[id]['x'] = 'right';

			if (arrow == 1)
			{
				boxContainer[id]['x'] = 'left';
			}
				
			var arrow = Math.floor(2*Math.random())+1;
				
			boxContainer[id]['y'] = 'bottom';
			if (arrow == 1)
			{
				boxContainer[id]['y'] = 'top';
			}

			boxContainer[id]['w'] = sizes.width;
			boxContainer[id]['h'] = sizes.height;
			



			div.click(function(e) 
			{ 
				if (!gameOver)
				{
					$(this).hide("slow", function() 
					{
						$(this).remove(); 
						$("#result").text(parseInt($("#result").text())+1); 
						createBoxes(Math.floor(boxAdditionalMaxCount*Math.random())+1);  
					});
				}
			});

			$("#area").append(div);
			
		}
	}
	function setBoxRandomSize(obj)
	{
		var height = Math.floor((boxMaxHeight-boxMinHeight+1)*Math.random())+boxMinHeight;
		var width = Math.floor((boxMaxWidth-boxMinWidth+1)*Math.random())+boxMinWidth;

		obj.css({"height": height, "width": width});

		return {"height": height, "width": width};
	}
	function setBoxRandomPosition(obj)
	{
		
		var left = Math.floor((areaSize.w-parseInt(obj.css("width")))*Math.random())+areaPosition.left;
		var top = Math.floor((areaSize.h-parseInt(obj.css("height")))*Math.random())+areaPosition.top;
		
		obj.css({"position": "absolute", "left": left +"px", "top": top +"px"});
	}
	function setBoxRandomBackground(obj)
	{
		var background = Math.floor(Math.random()*boxBackgrounds.length);
		obj.css("background-color", boxBackgrounds[background]);
	}
	function executeTimer()
	{
		var time = parseInt($("#time").text());

		if (time-1 > -1)
		{
			$("#time").text(time-1);
			return false;
		}

		window.clearInterval(gameTimer);
		window.clearInterval(boxMovement);
		gameOver = true;
		
	}

	function moveBoxes()
	{
		for (k in boxContainer)
		{
			var top = parseInt($("#"+k).css("top"));
			var left = parseInt($("#"+k).css("left"));

			if (boxContainer[k]['y'] == 'top')
			{
				var top = top-boxMovementVertical;
			}
			else
			{
				var top = top+boxMovementVertical;
			}
			if (boxContainer[k]['x'] == 'left')
			{
				var left = left-boxMovementHorizontal;
			}
			else
			{
				var left = left+boxMovementHorizontal;
			}

			if (left <= areaPosition.left)
			{
				boxContainer[k]['x'] = 'right';
				var left = areaPosition.left;
			}
			if (left+boxContainer[k]['w'] >= areaPosition.left+areaSize.w)
			{
				boxContainer[k]['x'] = 'left';
				var left = areaPosition.left+areaSize.w-boxContainer[k]['w'];
			}

			if (top < areaPosition.top)
			{
				boxContainer[k]['y'] = 'bottom';
				var top = areaPosition.top;
			}
			if (top+boxContainer[k]['h'] >= areaSize.h+areaPosition.top)
			{
				boxContainer[k]['y'] = 'top';
				var top = areaPosition.top+areaSize.h-boxContainer[k]['h'];
			}
				
			
			$("#"+k).css({"left": left, "top": top});
		}
		
	}
	$().ready(function()
	{
		areaPosition = $("#area").position();
		areaSize.w = $("#area").width();
		areaSize.h = $("#area").height();
		

		createBoxes(boxStartingCount);

		boxMovement = window.setInterval("moveBoxes()", 200);
		gameTimer = window.setInterval("executeTimer()", 1000);

	});