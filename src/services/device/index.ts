import { loggerService } from '../logger';
import { IDevice, Device } from '../../models/device';

const logNamespace = 'DeviceService';

const createDevice = async (content: IDevice): Promise<IDevice> => {
    loggerService.debug(`[${logNamespace}]: createDevice(): Creating device.`);
    loggerService.silly(`[${logNamespace}]: createDevice(): Content for device: ${JSON.stringify(content)}`);

    const isDeviceExisting = await isExisting(content.name);
    if (isDeviceExisting) {
        loggerService.debug(`[${logNamespace}]: createDevice(): Device name exists.`);
        throw new Error('Device exists');
    }

    const newDevice = await Device.create(content);
    const device = await Device.findById(newDevice.id).exec();

    return device;
};

const updateDevice = async (id: string, content: IDevice): Promise<IDevice> => {
    loggerService.debug(`[${logNamespace}]: updateDevice(): Updating device.`);
    loggerService.silly(`[${logNamespace}]: updateDevice(): Content for device: ${JSON.stringify(content)}`);

    await Device.updateOne({ _id: id }, content).exec();

    return content;
};

const deleteDevice = async (id: string): Promise<IDevice> => {
    loggerService.debug(`[${logNamespace}]: deleteDevice(): Deleting device ${id}.`);

    const device = await Device.findById(id).exec();

    if (!device) {
        loggerService.debug(`[${logNamespace}]: deleteDevice(): No device found with id ${id}.`);
        return null;
    }

    return Device.findByIdAndDelete(id).exec();
};

const getDevices = async (): Promise<IDevice[]> => {
    loggerService.debug(`[${logNamespace}]: getDevices(): Fetching all devices.`);

    const devices = await Device.find().exec();

    return devices;
};

const getDeviceById = async (id: string): Promise<IDevice> => {
    loggerService.debug(`[${logNamespace}]: getDeviceById(): Fetching device by id ${id}.`);

    const device = await Device.findById(id).exec();

    if (!device) {
        loggerService.debug(`[${logNamespace}]: getDeviceById(): No device found.`);
        return null;
    }

    return device;
};

const getDevicesByUserId = async (id: string): Promise<IDevice[]> => {
    loggerService.debug(`[${logNamespace}]: getDevicesByUserId(): Fetching devices for user ${id}.`);

    const devices = await Device.find({ userId: id }).exec();
    if (!devices) {
        loggerService.debug(`[${logNamespace}]: getDevicesByUserId(): No devices found.`);
        return null;
    }

    return devices;
};

const isExisting = async (name: string): Promise<boolean> => {
    const device = await Device.findOne({ name }).exec();
    console.log(device);
    return !!device;
};

export const deviceService = {
    createDevice,
    updateDevice,
    deleteDevice,
    getDevices,
    getDeviceById,
    getDevicesByUserId,
};
