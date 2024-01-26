import { createViewModel } from './main-view-model';

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = createViewModel()
}

export function onOpenMapTap(args) {
  const page = args.object.page; 

  let navigationOptions = {
    moduleName: "map-page", 
    context: { bindingContext: page.bindingContext } 
  }
  page.frame.navigate(navigationOptions);

}
