const NESW = ['N', 'E', 'S', 'W'];

const Maze = (maze) => {
    const rows = maze
        .split('\n')
        .map(row => row.split(''))
        .reverse();
    
    const height = rows.length;
    const width = rows[0].length;    

    const getNewCoords = (dir, x, y) => {
        switch (dir) {
            case "N": return [x, y + 1];
            case "E": return [x + 1, y];
            case "S": return [x, y - 1];
            case "W": return [x - 1, y];
            default: return [x, y]
        }
    }

    const peek = (dir, x, y) => {
        const [_x, _y] = getNewCoords(dir, x, y);
        const content = rows[_y] && rows[_y][_x];
        return [content, _x, _y];
    }

    const visit = (x, y) => {
        rows[y][x] = 'v';
    }

    return { peek, visit, width, height }

}

function pathFinder(mazeStr) {
    const maze = Maze(mazeStr);
    const routes = [[0, maze.height - 1]];

    do {
        const [x, y] = routes.pop();

        if (x === maze.width - 1 && y === 0) {
            return true;
        }

        maze.visit(x , y);

        [...NESW].forEach((dir) => {
            const [content, _x, _y] = maze.peek(dir, x, y);

            if (content === ".") {
                routes.push([_x, _y]);
            }
        })
    } while (routes.length)

    return false;
}
