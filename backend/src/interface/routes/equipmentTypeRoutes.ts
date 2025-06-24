import { Router } from 'express';
import { getEquipmentTypeTreeController } from '../controllers/equipmentTypeController';

const router = Router();

router.get('/equipment-types/tree', getEquipmentTypeTreeController);

export default router;
