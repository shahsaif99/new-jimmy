<template>

    <div class="equipment-detail-modern">
        <div class="detail-container" :class="{ 'no-image': !equipment.image_url }">
            <!-- Image Section (Optional) -->
            <div v-if="equipment.image_url" class="equipment-image-wrapper">
                <div class="image-backdrop"></div>
                <img :src="equipment.image_url" :alt="equipment.name" class="equipment-image" />
            </div>

            <!-- Details Section -->
            <div class="equipment-info-wrapper">
                <div class="header-section">
                    <h1 class="equipment-name">{{ equipment.name }}</h1>
                    <div class="status-chip" :class="getStatusClass(equipment.status)">
                        {{ equipment.status }}
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Equipment ID</span>
                        <span class="info-value">{{ equipment.tool_id }}</span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Supplier</span>
                        <span class="info-value">{{ equipment.supplier || 'N/A' }}</span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Category</span>
                        <span class="info-value">
                            {{ equipment.category ? equipment.category.name : 'N/A' }}
                        </span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Serial Number</span>
                        <span class="info-value">{{ equipment.serial_number }}</span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Certificate Number</span>
                        <span class="info-value">
                            {{ equipment.certificate_number || 'N/A' }}
                        </span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Valid Until</span>
                        <span class="info-value">
                            {{ formatDate(equipment.valid_until) }}
                        </span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Storage Location</span>
                        <span class="info-value">
                            {{ equipment.storage_location ? equipment.storage_location.name : 'N/A' }}
                        </span>
                    </div>

                    <div class="info-item">
                        <span class="info-label">Procedure</span>
                        <span class="info-value">
                            {{ equipment.procedure ? equipment.procedure.title : 'N/A' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { ref, onMounted } from '@vue/composition-api';
import axios from 'axios';
import router from '@/router'
import route from 'ziggy-js'

export default {
    name: 'EquipmentDetail',
    setup() {
        const equipment = ref({});
        const fetchEquipment = async (toolId) => {
            try {
                const response = await axios.get(route('equipments.getDetails', { tool_id: toolId }));
                equipment.value = response.data.data;
            } catch (error) {
                console.error('Error fetching equipment details:', error);
            }
        };

        onMounted(() => {

            const toolId = router.history.current.params.tool_id
            if (toolId) {
                fetchEquipment(toolId);
            }
        });

        const formatDate = (date) => {
            if (!date) return 'N/A';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        const getStatusClass = (status) => {
            return status === 'storage'
                ? 'status-storage'
                : 'status-active'
        }

        return {
            equipment,
            formatDate,
            getStatusClass
        };
    },
};
</script>


<style scoped>
.equipment-detail-modern {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f6f9;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.detail-container {
  display: flex;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
}

.detail-container.no-image .equipment-info-wrapper {
  flex: 0 0 100%;
  max-width: 100%;
}

.equipment-image-wrapper {
  position: relative;
  flex: 0 0 40%;
  max-width: 40%;
}

.image-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(33, 150, 243, 0.2) 0%, 
    rgba(33, 150, 243, 0.05) 100%
  );
  z-index: 1;
}

.equipment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.equipment-info-wrapper {
  flex: 0 0 60%;
  max-width: 60%;
  padding: 2.5rem;
  background-color: white;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.equipment-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.status-chip {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.status-storage {
  background-color: #e0e7ff;
  color: #4338ca;
}

.status-active {
  background-color: #d1fae5;
  color: #047857;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: #1f2937;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .detail-container {
    flex-direction: column;
  }

  .equipment-image-wrapper,
  .equipment-info-wrapper {
    max-width: 100%;
    flex: 0 0 100%;
  }

  .equipment-image-wrapper {
    height: 300px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>