const arr = ['X', '2', '3',
                   '4', 'X', '6',
                   '7', '8', 'X'
                  ]

function searchArr (arr){

    let index = 0;

    // X - AXIS
    for (let i = 1; i < 4; i++){

        const currentRow = [arr[index], arr[index + 1], arr[index + 2]].join('')

        if (currentRow === 'XXX') alert('TRUE'); 

        index = 3 * i;
    }

    // Y-AXIS
    for (let i = 0; i < 3; i++){

        const currentColumn = [arr[0 + i], arr[3 + i], arr[6 + i]].join('')

        if (currentColumn === 'XXX') alert('TRUE');
    }

    // DIAGONALS
    const diag1 = [arr[0], arr[4], arr[8]].join('')
           , diag2 = [arr[2], arr[4], arr[6]].join('');

    if (diag1 === 'XXX') return true;
}

