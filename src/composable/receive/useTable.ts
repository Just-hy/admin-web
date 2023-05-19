import { ReceiveListParm } from '@/api/receive/ReceiveType'
import { getListApi } from '@/api/receive/receive'
import { reactive, onMounted, ref, nextTick } from 'vue'
import { SelectProps } from "ant-design-vue";
import dayjs from 'dayjs'
type Key = string | number;
export default function useTable(state: { selectedRowKeys: Key[], loading: boolean },) {
    const StatusList = ref<SelectProps['options']>([
        { value: '1', label: '录入' },
        { value: '5', label: '开始清点' },
        { value: '10', label: '开始收货' },
        { value: '15', label: '开始过账' },
        { value: '20', label: '完成' },
        { value: '25', label: '结案' }
    ])
    const CheckStatusList = ref<SelectProps['options']>([
        { value: '1', label: '未清点' },
        { value: '5', label: '部分清点' },
        { value: '10', label: '清点完成' }
    ])
    const ReceiveStatusList = ref<SelectProps['options']>([
        { value: '1', label: '未收货' },
        { value: '5', label: '部分收货' },
        { value: '10', label: '收货完成' }
    ])
    const PostStatusList = ref<SelectProps['options']>([
        { value: '1', label: '未过账' },
        { value: '5', label: '部分过账' },
        { value: '10', label: '过账完成' }
    ])
    const tableHeight = ref(0)
    const tableList = reactive<{
        list: { did: number, cdate: string, mdate: string, dbDelDate: string }[];
    }>({
        list: [
        ]
    });
    const columns = [
        {
            title: "组织",
            dataIndex: "relOrganName",
            key: "relOrganName",
            width: 100
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
            title: "收货日期",
            dataIndex: "dbDelDate",
            key: "dbDelDate",
            width: 100,
        },
        {
            title: "单据状态",
            dataIndex: "dbStatus",
            key: "dbStatus",
            width: 100,
            customRender: (text: any) => {
                const status = StatusList.value?.find(item => item.value == text.value);
                return status ? status.label : text.dbStatus;
            }
        },
        {
            title: "清点状态",
            dataIndex: "dbCheckStatus",
            key: "dbCheckStatus",
            width: 100,
            customRender: (text: any) => {
                const status = CheckStatusList.value?.find(item => item.value == text.value);
                return status ? status.label : text.dbStatus;
            }
        },
        {
            title: "收货状态",
            dataIndex: "dbReceiveStatus",
            key: "dbReceiveStatus",
            width: 100,
            customRender: (text: any) => {
                const status = ReceiveStatusList.value?.find(item => item.value == text.value);
                return status ? status.label : text.dbStatus;
            }
        },
        {
            title: "过账状态",
            dataIndex: "dbPostStatus",
            key: "dbPostStatus",
            width: 100,
            customRender: (text: any) => {
                const status = PostStatusList.value?.find(item => item.value == text.value);
                return status ? status.label : text.dbStatus;
            }
        },
        {
            title: "仓库",
            dataIndex: "relWarehouseName",
            key: "relWarehouseName",
            width: 100,
        },
        {
            title: "供应商",
            dataIndex: "relSupplierName",
            key: "relSupplierName",
            width: 100,
        },
        {
            title: "客户",
            dataIndex: "relCustomerName",
            key: "relCustomerName",
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
        dbOrganDid: '',
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
        const newListParm = {
            ...listParm,
            beginCdate: dayjs(listParm.beginCdate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            endCdate: dayjs(listParm.endCdate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            mdate: dayjs(listParm.mdate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            dbBeginDelDate: dayjs(listParm.dbBeginDelDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            dbEndDelDate: dayjs(listParm.dbEndDelDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        };
        let res = await getListApi(newListParm)
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
            console.log(tableList.list)
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
        listParm.dbWarehouseDid = ''
        listParm.dbSupplierDid = ''
        listParm.dbCustomerDid = ''
        listParm.dbStatus = ''
        listParm.dbCheckStatus = ''
        listParm.dbReceiveStatus = ''
        listParm.dbPostStatus = ''
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
        resetBtn,
        StatusList,
        CheckStatusList,
        ReceiveStatusList,
        PostStatusList
    }
}