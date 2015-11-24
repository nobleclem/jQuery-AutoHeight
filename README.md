jQuery Auto Height
=====================

Set all matching elements to the same height.

## Demo
http://springstubbe.us/projects/demos/jquery-autoheight/

## Usage
```
$('.sameheight').autoHeight();
```
```
$('.sameheight').autoHeight({
    minWidth  : 400,
    maxWidth  : 800,
    perRow    : false,
    skipHidden: true
});
```
*perRow will detect elements in a row and get/set their maxHeight as a group rather than all elements selected
