import { successObj } from '../../utils/settings.js';
import UserCtlr from '../controllers/user.js';

export default (app) => {
    app.post('/api/user/add', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.add(body);
        res.json(result);
    })
    app.post('/api/user/list', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.list(body);
        res.json(result);
    })
    app.put('/api/user/update', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.update(body);
        res.json(result);
    })
    app.delete('/api/user/delete', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.delete(body);
        res.json(result);
    })
}