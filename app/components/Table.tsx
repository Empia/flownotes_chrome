import * as React from 'react';
import * as CSSModules from 'react-css-modules';
//import * as styles from './table.css';
import * as styles from './table.css';

interface TableProps extends React.Props<any>{
}

interface TableState{ 
}

class Table extends React.Component<TableProps, TableState>{
    render () {
        return <div className={styles.table}>
            <div className={styles.row}>
                <div className={styles.cell}>A0</div>
                <div className={styles.cell}>B0</div>
            </div>
        </div>;
    }
}
export default Table;