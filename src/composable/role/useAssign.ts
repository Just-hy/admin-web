import { getAssignShowApi } from '@/api/role/role'
import { ref, reactive } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { TreeParm } from '@/api/role/RoleType'
export default function useAssign() {
    //定义一下树
    const assignTree = ref()
    //是否显示连接线
    const showLine = ref<boolean>(true)
    //回显数据
    const checkedKeys = ref<number[]>([])
    //定义树数据
    const treeData = ref<TreeProps['treeData']>([])
    //树的属性配置
    const fieldNames = reactive({
        children: 'children',
        title: 'title',
        key: 'menuId'
    })
    //获取树数据
    const getTreeData = async (parm: TreeParm) => {
        let res = await getAssignShowApi(parm)
        if (res && res.code == 200) {
            //设置树的数据
            treeData.value = res.data.menuList
            //设置选中的数据
            checkedKeys.value = res.data.checkList
        }
        //有回显数据
        if (checkedKeys.value.length > 0) {
            let newArr: number[] = []
            checkedKeys.value.forEach((item) => {
                checked(item, treeData.value, newArr)
            })
            checkedKeys.value = newArr
        }
    }
    //找出所有的回显数据
    const checked = (id: string | number, data: any, newArr: any) => {
        data.forEach((item: any) => {
            if (item.menuId == id) {
                //是不是末级
                if (item.children && item.children.length == 0) {
                    newArr.push(item.menuId);
                }
            } else {
                if (item.children && item.children.length != 0) {
                    checked(id, item.children, newArr);
                }
            }
        });
    }
    return {
        assignTree,
        showLine,
        checkedKeys,
        fieldNames,
        treeData,
        getTreeData
    }
}   