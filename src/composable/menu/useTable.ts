import { getListApi } from '@/api/menu/menu'
import { onMounted, reactive, ref, nextTick } from 'vue'
import { h } from 'vue'
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
export default function useMenu() {
    const tableList = reactive({
        list: []
    })
    const tableHeight = ref(0)
    const getList = async () => {
        let res = await getListApi()
        if (res && res.code == 200) {
            tableList.list = res.data
        }
    }
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'title',
            key: 'title',
            width: 180
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon'
        },
        {
            title: '上级菜单',
            dataIndex: 'parentName',
            key: 'parentName'
        },
        {
            title: '菜单类型',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: '路由名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: '组件路径',
            dataIndex: 'url',
            key: 'url'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            width: 230
        },
    ]
    //自定义展开图标
    const expandIcon = (props: any) => {
        const { expanded, onExpand, record } = props
        if (record && record.children.length > 0) {
            //判断展开与关闭
            if (expanded) {
                return h(CaretDownOutlined, {
                    class: 'iconClass',
                    onclick: (event: Event) => {
                        onExpand(record, event)
                    }
                })
            } else {
                return h(CaretRightOutlined, {
                    class: 'iconClass',
                    onclick: (event: Event) => {
                        onExpand(record, event)
                    }
                })
            }
        } else {
            return h('span', {
                class: 'iconClass',
                style: {
                    display: 'inline-block',
                    width: '22px',
                    height: '16px'
                }
            })
        }
    }
    const refresh = () => {
        getList()
    }
    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 300
        })
    })
    return {
        tableList,
        tableHeight,
        columns,
        expandIcon,
        refresh
    }
}