import { ReceiveListParm } from '@/api/receive/ReceiveType'
import { getListApi } from '@/api/receive/receive'
import { reactive, onMounted, ref, nextTick } from 'vue'
import dayjs from 'dayjs'
type Key = string | number;
export default function useTable(state: { selectedRowKeys: Key[], loading: boolean }) {
    const tableHeight = ref(0)
    const tableList = reactive<{
        list: { did: number, cdate: string, mdate: string, dbDelDate: string }[];
    }>({
        list: [
        ]
    });
    const columns = [
        {
            title: "货主",
            dataIndex: "dbOrganDid",
            key: "dbOrganDid",
            width: 100,
        },
        {
            title: "收货单号",
            dataIndex: "dbDoc",
            key: "dbDoc",
            width: 100,
        },
        {
            title: "业务单号",
            dataIndex: "dbBusinessDoc",
            key: "dbBusinessDoc",
            width: 100,
        },
        {
            title: "业务类型",
            dataIndex: "dbSrcType",
            key: "dbSrcType",
            width: 100,
        },
        {
            title: "收货日期",
            dataIndex: "dbDelDate",
            key: "dbDelDate",
            width: 100,
        },
        {
            title: "单据状态",
            dataIndex: "dbOrganCode",
            key: "dbOrganCode",
            width: 100,
        },
        {
            title: "清点状态",
            dataIndex: "dbCheckStatus",
            key: "dbCheckStatus",
            width: 100,
        },
        {
            title: "收货状态",
            dataIndex: "dbReceiveStatus",
            key: "dbReceiveStatus",
            width: 100,
        },
        {
            title: "过账状态",
            dataIndex: "dbPostStatus",
            key: "dbPostStatus",
            width: 100,
        },
        {
            title: "仓库编码",
            dataIndex: "dbWarehouseDid",
            key: "dbWarehouseDid",
            width: 100,
        },
        {
            title: "供应商编码",
            dataIndex: "dbWarehouseDid",
            key: "dbWarehouseDid",
            width: 100,
        },
        {
            title: "客户编码",
            dataIndex: "dbCustomerDid",
            key: "dbCustomerDid",
            width: 100,
        }
    ]
    const listParm = reactive<ReceiveListParm>({
        pageSize: 1,
        currentPage: 1,
        did: '',
        cuser: '',
        muser: '',
        beginCdate: dayjs().subtract(1, 'month'),
        endCdate: dayjs(),
        mdate: dayjs(),
        plastupdate: 0,
        dbDoc: '',
        dbOwnerDid: '',
        dbBeginDelDate: dayjs().subtract(1, 'month'),
        dbEndDelDate: dayjs(),
        dbSupplierDid: '',
        dbStatus: '',
        dbCheckStatus: '',
        dbReceiveStatus: '',
        dbPostStatus: '',
        dbTosDid: '',
        dbSrcType: '',
        dbSrcDoc: '',
        dbBusinessDoc: '',
        dbCustomerDid: '',
        dbWarehouseDid: '',
        dbRemark: '',
    })
    const receivePage = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total: number) => `共有${total}条数据`,
        //页数改变时触发
        onChange: (current: number, size: number) => {
            listParm.currentPage = current;
            listParm.pageSize = size;
            receivePage.current = current;
            receivePage.pageSize = size;
            getList()
        }
    })
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            const records = res.data.records;
            for (let i = 0; i < records.length; i++) {
                records[i].key = records[i].did;
            }
            tableList.list = records;
            tableList.list.forEach((item) => {
                item.cdate = dayjs(item.cdate).format('YYYY-MM-DD')
                item.mdate = dayjs(item.mdate).format('YYYY-MM-DD')
                item.dbDelDate = dayjs(item.dbDelDate).format('YYYY-MM-DD')
            })
        }
    }
    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 300
        })
    })
    const searchBtn = () => {
        //置空
        state.selectedRowKeys = [];
        getList()
    }
    const resetBtn = () => {
        //置空
        state.selectedRowKeys = [];
        listParm.currentPage = 1
        listParm.did = ''
        listParm.dbOwnerDid = ''
        getList()
    }
    return {
        tableHeight,
        tableList,
        columns,
        listParm,
        receivePage,
        getList,
        searchBtn,
        resetBtn
    }
}