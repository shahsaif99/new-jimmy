<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" title="QR Code" size="lg"
        @close="$emit('update:is-qrcode-active', false)" :visible="isQrcodeActive"
        @hide="$emit('update:is-qrcode-active', false)">
        <b-overlay spinner-variant="primary" spinner-type="grow" rounded="sm" opacity="0.20">
            <div class="text-center">
                <h1>QR Code</h1>

                <p>Download / print this QR code</p>
                <div v-if="qrCodeDataUrl">
                    <img class="border rounded" :src="qrCodeDataUrl" alt="QR Code" />
                </div>

                <div class="d-flex justify-content-center mt-4">
                    <b-button variant="outline-secondary" class="mr-2" @click="printQrCode">
                        Print
                    </b-button>
                    <b-button variant="primary" @click="downloadQrCode">
                        Download QR Code
                    </b-button>
                </div>
            </div>
        </b-overlay>
    </b-modal>
</template>
<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import QRCode from 'qrcode'; // Importing node-qrcode
import { BOverlay, BModal, BButton } from 'bootstrap-vue';
import router from '@/router';

export default {
    components: {
        BOverlay, BModal, BButton
    },
    model: {
        prop: "isQrcodeActive",
        event: "update:is-qrcode-active",
    },
    props: {
        isQrcodeActive: {
            type: Boolean,
            required: true,
        },
        qrText: {
            type: String,
            required: true, // Expecting the text or UUID to encode
        },
    },
    setup(props, { emit }) {

        // QR code reactive state
        const qrCodeDataUrl = ref(null);

        // Watch for the modal to be shown and generate the QR code
        watch(
            () => props.isQrcodeActive,
            (newVal) => {
                if (newVal) {
                    generateQrCode();
                }
            }
        );

        // Function to generate the QR code
        async function generateQrCode() {
            const fullUrl = `${window.location.origin}${router.resolve(`/equipment/${props.qrText}`).href}`;
            try {
                qrCodeDataUrl.value = await QRCode.toDataURL(fullUrl, {
                    width: 256,
                    margin: 1,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                });
            } catch (err) {
                console.error('Error generating QR Code:', err);
            }
        }

        // Function to handle QR code printing
        function printQrCode() {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(
                `<img src="${qrCodeDataUrl.value}" style="max-width: 100%;">`
            );
            printWindow.document.close();
            printWindow.print();
        }

        // Function to handle QR code download
        function downloadQrCode() {
            const link = document.createElement('a');
            link.href = qrCodeDataUrl.value;
            link.download = 'qr-code.png';
            link.click();
        }

        // Ensure QR code is generated when modal is mounted
        onMounted(() => {
            if (props.isQrcodeActive) {
                generateQrCode();
            }
        });

        return {
            qrCodeDataUrl,
            printQrCode,
            downloadQrCode,
        };
    },
};
</script>
