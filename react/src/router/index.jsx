import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from '../pages/index'

/**
 * 路由配置
 */
const RouterConfig = basePath => {
	return () => (
		<Router>
			<Switch>
				<Route path={`${basePath}index`} component={Index} />
			</Switch>
		</Router>
	);
}

export default RouterConfig;