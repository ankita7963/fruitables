// import { Title } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, colors, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { token } from '../../theme';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { LineChart } from '@mui/x-charts/LineChart';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import CircleIcon from '@mui/icons-material/Circle';




// ------ 4 charts -----
const StateCart = ({ data }) => {
    const theme = useTheme();
    const color = token(theme.palette.mode);
    console.log('data', data);



    return (
        <Paper elevation={2} sx={{ p: 4 }}>
            <Grid container>
                <Grid size={8}>
                    <Typography variant='h6' sx={{ fontWeight: '530', color: 'text.primary' }}>{data.title}</Typography>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', my: 2, color: 'text.primary' }}>{data.count}</Typography>
                    <Box display={'flex'}>
                        <KeyboardDoubleArrowUpIcon sx={{ color: color.primary[500] }} />
                        <Typography component={'span'} sx={{ mx: 0.5, fontWeight: '550' }}> {data.per} </Typography>
                        <Typography component={'p'} color='text.secondary'> last 7 days </Typography>
                    </Box>
                </Grid>

                <Grid size={4}>
                    <SparkLineChart
                        sx={{ display: 'flex', justifyContent: 'flex-end', width: 80, height: 80 }}
                        plotType="bar"
                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                        showHighlight={data.showHighlight}
                        showTooltip={data.showTooltip}
                        color={data.color}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}



// ------ Sales of Different Categories -----
export const fruite = [
    { label: 'Fruite', value: 72.72, },
    { label: 'Vagetables', value: 16.38, },
    { label: 'Dry Fruite', value: 3.83, },
    { label: 'Organic Items', value: 2.42, },
    { label: 'Other', value: 4.65, },
];

export const vagetables = [
    { label: 'Android', value: 70.48, },
    { label: 'iOS', value: 28.8, },
    { label: 'Other', value: 0.71, },
];

export const dryfruite = [
    { label: 'Mobile', value: 59.12, },
    { label: 'Desktop', value: 40.88, },
];
const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const categoryAndSells = [
    ...vagetables.map((v) => ({
        ...v,
        label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
        value: normalize(v.value, dryfruite[0].value),
    })),
    ...fruite.map((v) => ({
        ...v,
        label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
        value: normalize(v.value, dryfruite[1].value),
    })),
];

export const valueFormatter = (item) => `${item.value}%`;

// ------ Sales of Different Categories 2 -----
export const data = [
    { id: 'data-0', x1: 329.39, y1: 443.28, y2: 153.9, },
    { id: 'data-1', x1: 96.94, y1: 110.5, y2: 217.8, },
    { id: 'data-2', x1: 336.35, y1: 175.23, y2: 286.32, },
    { id: 'data-3', x1: 159.44, y1: 195.97, y2: 325.12, },
    { id: 'data-4', x1: 188.86, y1: 351.77, y2: 144.58, },
    { id: 'data-5', x1: 143.86, y1: 43.253, y2: 146.51, },
    { id: 'data-6', x1: 202.02, y1: 376.34, y2: 309.69, },
    { id: 'data-7', x1: 384.41, y1: 31.514, y2: 236.38, },
    { id: 'data-8', x1: 256.76, y1: 231.31, y2: 440.72, },
    { id: 'data-9', x1: 143.79, y1: 108.04, y2: 20.29, },
    { id: 'data-10', x1: 103.48, y1: 321.77, y2: 484.17, },
    { id: 'data-11', x1: 272.39, y1: 120.18, y2: 54.962, },
    { id: 'data-12', x1: 23.57, y1: 366.2, y2: 418.5, },
    { id: 'data-13', x1: 219.73, y1: 451.45, y2: 181.32, },
    { id: 'data-14', x1: 54.99, y1: 294.8, y2: 440.9, },
    { id: 'data-15', x1: 134.13, y1: 121.83, y2: 273.52, },
    { id: 'data-16', x1: 12.7, y1: 287.7, y2: 346.7, },
    { id: 'data-17', x1: 176.51, y1: 134.06, y2: 74.528, },
    { id: 'data-18', x1: 65.05, y1: 104.5, y2: 150.9, },
    { id: 'data-19', x1: 162.25, y1: 413.07, y2: 26.483, },
    { id: 'data-20', x1: 68.88, y1: 74.68, y2: 333.2, },
    { id: 'data-21', x1: 95.29, y1: 360.6, y2: 422.0, },
    { id: 'data-22', x1: 390.62, y1: 330.72, y2: 488.06, },
];



// ------ Order Trend Over Time -----
export const dataset = [
    { Fruite: 59, Vagetables: 57, newYork: 86, India: 21, month: 'Jan', },
    { Fruite: 50, Vagetables: 52, newYork: 78, India: 28, month: 'Feb', },
    { Fruite: 47, Vagetables: 53, newYork: 106, India: 41, month: 'Mar', },
    { Fruite: 54, Vagetables: 56, newYork: 92, India: 73, month: 'Apr', },
    { Fruite: 57, Vagetables: 69, newYork: 92, India: 99, month: 'May', },
    { Fruite: 60, Vagetables: 63, newYork: 103, India: 144, month: 'June', },
    { Fruite: 59, Vagetables: 60, newYork: 105, India: 319, month: 'July', },
    { Fruite: 65, Vagetables: 60, newYork: 106, India: 249, month: 'Aug', },
    { Fruite: 51, Vagetables: 51, newYork: 95, India: 131, month: 'Sept', },
    { Fruite: 60, Vagetables: 65, newYork: 97, India: 55, month: 'Oct', },
    { Fruite: 67, Vagetables: 64, newYork: 76, India: 48, month: 'Nov', },
    { Fruite: 61, Vagetables: 70, newYork: 103, India: 25, month: 'Dec', },
    // { london: 61, paris: 70, newYork: 103, India: 25, month: 'Dec', },

];

export function valueFormatter1(value) {
    return `${value}mm`;
}

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
            width: 60,
        },
    ],
    height: 300,
};


// ------ Order Trend Over Time 2 -----
const pData = [2400, 1398, -9800, 3908, 4800, -3800, 4300];
const uData = [4000, -3000, -2000, 2780, -1890, 2390, 3490];

const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const LatestProduct = ({ data }) => {
    const theme = useTheme();
    const color = token(theme.palette.mode);
    console.log('data', data);

    return (
        <Paper sx={{ p: 4 }}>
            <Grid container direction="column" spacing={2}>

                <Grid >

                    <Box display={'flex'} alignItems="center">
                        <Typography component={'image'}>
                            <img src={`../public/img/categoryimg/${data.product_img}`} style={{ width: 52, height: 52, borderRadius: 5 }} />
                        </Typography>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}> {data.name}</Typography>
                            <Typography color="text.secondary"> {data.price} </Typography>
                        </Box>
                        {/* <Typography variant='h6' sx={{ fontWeight: 'bold', my: 2, color: 'text.primary' }}>{data.name}<br />{data.price}</Typography> */}
                    </Box>

                </Grid>
            </Grid>
        </Paper>
    )
}

const handleChange = () => { }



function Dashboard(props) {
    const theme = useTheme();
    const color = token(theme.palette.mode);

    // 4 charts
    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);
    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };
    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };

    const StateCartData = [
        { _id: 3, title: "Total User", count: '18,785', per: '+2.6%', color: "orange" },
        { _id: 1, title: "Total Product", count: '18,785', per: '+2.6%', color: "red" },
        { _id: 4, title: "Total Orders", count: '18,785', per: '+2.6%', color: "blue" },
        { _id: 2, title: "Total Revenue", count: '18,785', per: '+2.6%', color: "green" },
    ];


    const SellerProductData = [
        { _id: 1, product_img: `APPLE.jpg`, name: 'Apple', price: '83.74', toder: '2', rank: "Top1" },
        { _id: 2, product_img: `avocado.jpg`, name: 'Avocado', price: '97.14', toder: '4', rank: "Top2" },
        { _id: 3, product_img: `berries black.jpg`, name: 'Black Berries', price: '68.71', toder: '9', rank: "Top3" },
        { _id: 4, product_img: `BNANA.jpg`, name: 'Banana', price: '85.21', toder: '4', rank: "Top4" },
        { _id: 5, product_img: `lemon.jpg`, name: 'Lemon', price: '52.68', toder: '2', rank: "Top5" },
        { _id: 6, product_img: `mango.jpg`, name: 'Mango', price: '34.75', toder: '7', rank: "Top6" }
    ];

    const LatestProductData = [
        { _id: 1, product_img: `APPLE.jpg`, name: 'Apple', price: '83.74', variant: '3' },
        { _id: 2, product_img: `avocado.jpg`, name: 'Avocado', price: '97.14', variant: '5' },
        { _id: 3, product_img: `berries black.jpg`, name: 'Black Berries', price: '68.71', variant: '2' },
        { _id: 4, product_img: `BNANA.jpg`, name: 'Banana', price: '85.21', variant: '1' },
        { _id: 5, product_img: `lemon.jpg`, name: 'Lemon', price: '52.68', variant: '5' },
        { _id: 6, product_img: `mango.jpg`, name: 'Mango', price: '34.75', variant: '7' }
    ];







    return (
        
            <Grid container rowSpacing={3} columnSpacing={3}>

                {/* 4 charts */}
                {StateCartData.map((v, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={v._id}>
                        <StateCart data={{ ...v, showHighlight, showTooltip }} />
                    </Grid>
                ))}

                {/* <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }}
                >
                    <StateCart
                        data={{
                            title: "Product",
                            count: '18,785',
                            per: '+2.6%',
                            showHighlight,
                            showTooltip
                        }}
                    />
                </Grid> */}





                {/* Sales of Different Categories */}
                <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                    <Paper elevation={5} sx={{ p: 4 }} >
                        <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary' }}>Sales of Different Categories</Typography>
                        <Typography component={'p'} color='text.secondary'> Downloaded by operating system </Typography>
                        <PieChart
                            series={[
                                {
                                    data: fruite,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    valueFormatter,
                                },
                            ]}
                            height={330}
                            width={320}
                        />
                    </Paper>
                </Grid>


                {/* Sales of Different Categories  2 */}
                <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                    <Paper elevation={5} sx={{ p: 4 }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary' }}>Sales of Different Categories
                                <Typography component={'p'} color='text.secondary'> Downloaded by operating system </Typography>
                            </Typography>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Year</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={2023}
                                    label="Year"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={2020}>2020</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2024}>2024</MenuItem>
                                    <MenuItem value={2025}>2025</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>
                        <ScatterChart
                            height={300}
                            series={[
                                {
                                    label: 'Farm Fresh A',
                                    data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                                },
                                {
                                    label: 'Frozen B',
                                    data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                                },
                            ]}
                        />
                    </Paper>
                </Grid>





                {/* Order Trend Over Time */}
                <Grid size={8}>
                    <Paper elevation={5} sx={{ p: 4 }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary' }}>Order Trend Over Time
                                <Box display={'flex'}>
                                    <Typography component={'span'} sx={{ mx: 0.5, fontWeight: '550' }}> (+43%) </Typography>
                                    <Typography component={'p'} color='text.secondary'> than last year </Typography>
                                </Box>
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Year</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={2023}
                                    label="Year"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={2020}>2020</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2024}>2024</MenuItem>
                                    <MenuItem value={2025}>2025</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>

                        <BarChart
                            dataset={dataset}
                            xAxis={[{ dataKey: 'month' }]}
                            series={[
                                { dataKey: 'Fruite', label: 'Fruite', valueFormatter1 },
                                { dataKey: 'Vagetables', label: 'Vagetables', valueFormatter1 },
                                { dataKey: 'newYork', label: 'New York', valueFormatter1 },
                                { dataKey: 'India', label: 'India', valueFormatter1 },
                            ]}
                            {...chartSetting}
                        />

                    </Paper>
                </Grid>


                {/* Order Trend Over Time 2 */}
                <Grid size={4}>
                    <Paper elevation={5} sx={{ p: 4 }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary' }}>Order Trend Over Time
                                <Box display={'flex'}>
                                    <Typography component={'span'} sx={{ mx: 0.5, fontWeight: '550' }}> (+43%) </Typography>
                                    <Typography component={'p'} color='text.secondary'> than last year </Typography>
                                </Box>
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Year</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={2023}
                                    label="Year"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={2020}>2020</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2024}>2024</MenuItem>
                                    <MenuItem value={2025}>2025</MenuItem>

                                </Select>
                            </FormControl>

                        </Box>

                        {/* <BarChart
                            height={300}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId', stack: 'stack1' },
                                { data: uData, label: 'uv', id: 'uvId', stack: 'stack1' },
                            ]}
                            xAxis={[{ data: xLabels }]}
                            yAxis={[{ width: 60 }]}
                        /> */}

                    </Paper>
                </Grid>



                {/* Area installed */}
                <Grid size={12}>
                    <Paper elevation={5} sx={{ p: 4 }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary' }}>Area installed
                                <Box display={'flex'}>
                                    <Typography component={'span'} sx={{ mx: 0.5, fontWeight: '550' }}> (+43%) </Typography>
                                    <Typography component={'p'} color='text.secondary'> than last year </Typography>
                                </Box>
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Year</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={2023}
                                    label="Year"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={2020}>2020</MenuItem>
                                    <MenuItem value={2021}>2021</MenuItem>
                                    <MenuItem value={2022}>2022</MenuItem>
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2024}>2024</MenuItem>
                                    <MenuItem value={2025}>2025</MenuItem>

                                </Select>
                            </FormControl>

                        </Box>


                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                },
                            ]}
                            height={300}
                        />
                    </Paper>
                </Grid>









                <Grid size={7}>
                    <Paper elevation={2} sx={{ p: 0.2 }}>
                        <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary', my: 4.8, mx: 5 }}>Seller Product</Typography>

                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead >
                                    <TableRow sx={{ backgroundColor: '#f4f6f8', color: '#68727cff' }}>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total Order</TableCell>
                                        <TableCell>Rank</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {SellerProductData.map((v) => (
                                        <TableRow
                                            key={v._id}
                                        >
                                            <TableCell align="center">
                                                <img src={`../public/img/categoryimg/${v.product_img}`} style={{ width: 52, height: 52, borderRadius: 100 }} />
                                            </TableCell>
                                            <TableCell align="center">{v.name}</TableCell>
                                            <TableCell align="center">${v.price}</TableCell>
                                            <TableCell align="center">{v.toder}</TableCell>
                                            <Box sx={{ my: 1, backgroundColor: "#9aa1eeff", borderRadius: 5, textAlign: "center", boxShadow: 3 }}>
                                                <TableCell>{v.rank}</TableCell>
                                            </Box>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>


                <Grid size={5}>

                    {LatestProductData.map((v, i) => (
                        <Grid key={v._id} >
                            <LatestProduct data={{ ...v, showHighlight, showTooltip }} />
                        </Grid>
                    ))}
                    {/* <Paper elevation={5} sx={{ p: 4 }}>
                        <Typography variant='h5' sx={{ fontWeight: '590', color: 'text.primary', my: 4.8 }}>Latest Product</Typography>

                        {LatestProductData.map((v) => (
                            <TableRow
                                key={v._id}
                                sx={{ borderBottom: 'none ' }}
                            >
                                <TableCell align="center">
                                    <img src={`../public/img/categoryimg/${v.product_img}`} style={{ width: 52, height: 52, borderRadius: 5 }} />
                                </TableCell>
                                <TableCell align="center">{v.name}</TableCell>
                                <TableCell align="center">${v.price}</TableCell>
                                <TableCell align="center" >
                                    <CircleIcon sx={{ color: color.secondary[700] }} /><CircleIcon sx={{ color: color.primary[700] }} />
                                    +{v.variant}
                                </TableCell>
                            </TableRow>
                        ))}
                    </Paper> */}
                </Grid>



            </Grid >

    );
}

export default Dashboard;