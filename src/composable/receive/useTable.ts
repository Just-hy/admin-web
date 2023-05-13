import { ReceiveListParm } from '@/api/receive/ReceiveType'
import { getListApi } from '@/api/receive/receive'
import { reactive, onMounted, ref, nextTick } from 'vue'
type Key = string | number;
export default function useTable(state: { selectedRowKeys: Key[], loading: boolean }) {
    const tableHeight = ref(0)
    const tableList = reactive({
        list: []
    })
    const columns = [
        {
            title: "组织did",
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
        cdate: new Date(),
        mdate: new Date(),
        plastupdate: 0,
        dbDoc: '',
        dbOrganDid: '',
        dbOrganCode: '',
        dbDelDate: new Date,
        dbSupplierDid: '',
        dbSupplierCode: '',
        dbStatus: '',
        dbCheckStatus: '',
        dbReceiveStatus: '',
        dbPostStatus: '',
        dbTosDid: '',
        dbTosCode: '',
        dbSrcType: '',
        dbSrcDoc: '',
        dbBusinessDoc: '',
        dbCustomerDid: '',
        dbCustomerCode: '',
        dbWarehouseDid: '',
        dbWarehouseCode: '',
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
        listParm.dbOrganDid = ''
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