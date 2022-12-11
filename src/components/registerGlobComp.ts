import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Card, Switch, Input, Checkbox } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(Card).use(Switch).use(Input).use(Checkbox);
}
