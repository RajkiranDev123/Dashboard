import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// import { dataset, valueFormatter } from '../dataset/weather';
import { getMetaMonths } from '../../services/ApiRequests';
import Spiner2 from '../Spiner/Spiner2';
const chartSetting = {
    xAxis: [
        {
            label: 'Users',
        },
    ],
    width: 400,
    height: 250,
};

function BarGraph() {
    const [spin, setSpin] = React.useState(false)

    const [metaMonths, setMetaMonths] = React.useState({})
    const [dataSet, setDataSet] = React.useState([])


    const getMetaData = async () => {
        setSpin(true)
        const response = await getMetaMonths()

        if (response.status == 200) {
            setSpin(false)

            setMetaMonths(response?.data?.metaMonths)
            setDataSet([
                {

                    seoul: response?.data?.metaMonths?.january,
                    month: 'Jan',
                },
                {

                    seoul: response?.data?.metaMonths?.february,
                    month: 'Feb',
                },
                {

                    seoul: response?.data?.metaMonths?.march,
                    month: 'Mar',
                },
                {

                    seoul: response?.data?.metaMonths?.april,
                    month: 'Apr',
                },
                {

                    seoul: response?.data?.metaMonths?.may,
                    month: 'May',
                },
                {

                    seoul: response?.data?.metaMonths?.june,
                    month: 'Jun',
                },
                {

                    seoul: response?.data?.metaMonths?.july,
                    month: 'Jul',
                },
                {

                    seoul: response?.data?.metaMonths?.august,
                    month: 'Aug',
                },
                {

                    seoul: response?.data?.metaMonths?.september,
                    month: 'Sep',
                },
                {

                    seoul: response?.data?.metaMonths?.october,
                    month: 'Oct',
                },
                {

                    seoul: response?.data?.metaMonths?.november,
                    month: 'Nov',
                },
                {

                    seoul: response?.data?.metaMonths?.december,
                    month: 'Dec',
                },
            ])



        } else {
            console.log("failed to fetch")
        }

    }

    React.useEffect(() => {
        getMetaData()
    }, [])



    function valueFormatter(value) {
        return `${value} users`;
    }

    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {spin ? <Spiner2 /> : <BarChart
                dataset={dataSet}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', label: 'Users Added', valueFormatter }]}
                layout="horizontal"
                {...chartSetting}
            />}
        </div>

    </>

    );
}

export default BarGraph
