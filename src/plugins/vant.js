//Vant按需引入
import {Tab, Tabs, Field, Popup, CellGroup, Button, Cell, IndexBar, IndexAnchor} from 'vant';
import {Cascader} from 'vant'

export function vant(app) {
    app.use(Button);
    app.use(Tab) //标签
    app.use(Tabs); //切换
    app.use(Cascader); //级联选择框
    app.use(Field); //输入框
    app.use(Popup); //弹框
    app.use(CellGroup); //单元格
    app.use(IndexBar);
    app.use(IndexAnchor);
    app.use(Cell);
}
