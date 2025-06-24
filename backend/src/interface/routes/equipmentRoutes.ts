import { Router } from 'express';
import { createEquipmentController, deleteEquipmentController, getEquipmentsController, updateEquipmentController } from '../controllers/equipmentController';

const router = Router();

router.post('/equipment', createEquipmentController);
router.get('/equipments', getEquipmentsController);
router.delete('/equipment/:id', deleteEquipmentController);
router.put('/equipment/:id', updateEquipmentController);

export default router;