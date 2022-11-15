import fetch from "node-fetch";
import iCloudService from "..";

export interface iCloudDevices {
    devices: Array<{
        serialNumber: string
        osVersion: string
        modelLargePhotoURL2x: string
        modelLargePhotoURL1x: string
        name: string
        model: string
        udid: string
        modelSmallPhotoURL2x: string
        modelSmallPhotoURL1x: string
        modelDisplayName: string
        latestBackup?: string
        paymentMethods?: Array<string>
        imei?: string
    }>
    paymentMethods: Array<{
        lastFourDigits: string
        balanceStatus: string
        suspensionReason: string
        id: string
        type: string
        isCarKey: boolean
    }>
}
export interface iCloudFamilyInfo {
    "status-message": string
    familyInvitations: Array<any>
    outgoingTransferRequests: Array<any>
    isMemberOfFamily: boolean
    family: {
        familyId: string
        transferRequests: Array<any>
        invitations: Array<any>
        organizer: string
        members: Array<string>
        outgoingTransferRequests: Array<any>
        etag: string
    }
    familyMembers: Array<{
        lastName: string
        dsid: string
        originalInvitationEmail: string
        fullName: string
        ageClassification: string
        appleIdForPurchases: string
        appleId: string
        familyId: string
        firstName: string
        hasParentalPrivileges: boolean
        hasScreenTimeEnabled: boolean
        hasAskToBuyEnabled: boolean
        hasSharePurchasesEnabled: boolean
        hasShareMyLocationEnabled: boolean
        dsidForPurchases: string
        shareMyLocationEnabledFamilyMembers?: Array<any>
    }>
    status: number
    showAddMemberButton: boolean
}
export class iCloudAccountDetailsService {
    service: iCloudService;
    serviceUri: string;
    constructor(service: iCloudService, serviceUri: string) {
        this.service = service;
        this.serviceUri = serviceUri;
    }

    private _devices;
    async getDevices(refresh = false): Promise<iCloudDevices> {
        if (!refresh && this._devices) return this._devices;
        const response = await fetch(this.serviceUri + "/setup/web/device/getDevices", { headers: this.service.authStore.getHeaders() });
        const json = await response.json();
        this._devices = json;
        return this._devices;
    }

    private _family;
    async getFamily(refresh = false): Promise<iCloudFamilyInfo> {
        if (!refresh && this._family) return this._family;
        const response = await fetch(this.serviceUri + "/setup/web/family/getFamilyDetails", { headers: this.service.authStore.getHeaders() });
        const json = await response.json();
        this._family = json;
        return this._family;
    }
}