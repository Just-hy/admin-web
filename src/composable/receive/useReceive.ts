import { ReceiveType } from "@/api/receive/ReceiveType"
import { addApi, getOrganListApi, getWarehouseListApi, getSupplierListApi, getCustomerListApi, testApi } from "@/api/receive/receive"
import { EditType } from "@/type/BaseEnum"
import { onMounted, ref, reactive, computed } from "vue"
import { message, SelectProps } from "ant-design-vue";
import { FuncList } from "@/type/BaseType";
import useInstance from "@/hooks/useInstance";
type Key = string | number;
export default function useReceive(getList: FuncList, tableList: { list: any[] }, state: { selectedRowKeys: Key[], loading: boolean }) {
    const { global } = useInstance()
    const addRef = ref()
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    const showBtn = () => {
        const selectedData = state.selectedRowKeys.map((key) =>
            tableList.list.find((item: { key: string }) => item.key === key)
        );
        addRef.value.show(EditType.SHOW, selectedData[0])
        state.selectedRowKeys = [];
    }
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const editBtn = () => {

    };
    const deleteBtn = () => {
        state.loading = true;
        // ajax request after empty completing
        const selectedData = state.selectedRowKeys.map((key) =>
            tableList.list.find((item: { key: string }) => item.key === key)
        );
        console.log(selectedData);
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };
    const save = async (data: ReceiveType) => {
        const res = await addApi(data)
        if (res && res.code == 200) {
            message.success(res.msg)
            getList()
        }
    }
    const organList = ref<SelectProps['options']>([])
    const getOrganList = async () => {
        let res = await getOrganListApi()
        if (res && res.code == 200) {
            organList.value = res.data
        }
    }
    const warehouseList = ref<SelectProps['options']>([])
    const getWarehouseList = async () => {
        let res = await getWarehouseListApi()
        if (res && res.code == 200) {
            warehouseList.value = res.data
        }
    }
    const supplierList = ref<SelectProps['options']>([])
    const getSupplierList = async () => {
        let res = await getSupplierListApi()
        if (res && res.code == 200) {
            supplierList.value = res.data
        }
    }
    const customerList = ref<SelectProps['options']>([])
    const getCustomerList = async () => {
        let res = await getCustomerListApi()
        if (res && res.code == 200) {
            customerList.value = res.data
        }
    }
    const filter = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
    }
    onMounted(() => {
        getOrganList()
        getWarehouseList()
        getSupplierList()
        getCustomerList()
        type MyObj = { [key: string]: string };
        let OBJ: MyObj = {
            a: "1",
            b: "2"
        };
        // for (let i = 0; i < 200; i++) {
        //     let key = generateRandomString(Math.floor(Math.random() * 10) + 1);
        //     let value = generateRandomString(Math.floor(Math.random() * 30) + 1);
        //     OBJ[key] = value;
        // }
        // function generateRandomString(length: any) {
        //     let string = '';
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //     for (let i = 0; i < length; i++) {
        //         string += characters.charAt(Math.floor(Math.random() * characters.length));
        //     }
        //     return string;
        // }

        // let repeatedObj = [];
        // for (let i = 0; i < 100000; i++) {
        //     repeatedObj.push(OBJ);
        // }
        let jiaMi: string = global.$Encrypt(OBJ);
        console.log("需要加密的对象:");
        console.log(OBJ);
        console.log('加密:', jiaMi)
        console.log('解密:')
        console.log(global.$Decrypt(jiaMi))
        testApi(jiaMi)
    })
    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef,
        organList,
        warehouseList,
        supplierList,
        customerList,
        filter,
        showBtn
    }
}