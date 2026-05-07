const KEYS = {
    USERS: 'app_users',
    BARANG: 'app_barang',
    SUPPLIERS: 'app_suppliers',
    LOGS: 'app_logs',
    THEME: 'app_theme'
};

export const storageService = {
    // Helper to get data from localStorage
    _get(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
            return defaultValue;
        }
    },

    // Helper to save data to localStorage
    _set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving localStorage key "${key}":`, e);
        }
    },

    // --- LOGGING SYSTEM ---
    _addLog(action, details) {
        const logs = this._get(KEYS.LOGS);
        logs.unshift({
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: localStorage.getItem('profileName') || 'System',
            action,
            details
        });
        // Keep only last 100 logs
        this._set(KEYS.LOGS, logs.slice(0, 100));
    },

    getLogs() {
        return this._get(KEYS.LOGS);
    },

    // --- AUTH ---
    register(user) {
        const users = this._get(KEYS.USERS);
        if (users.find(u => u.username === user.username)) {
            throw new Error('Username already exists');
        }
        users.push(user);
        this._set(KEYS.USERS, users);
        this._addLog('REGISTER', `New user registered: ${user.username}`);
        return { message: 'SUCCESS', data: user };
    },

    login({ username, password }) {
        const users = this._get(KEYS.USERS);
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        
        localStorage.setItem('token', 'mock-token-' + Date.now());
        localStorage.setItem('profileName', user.profileName);
        this._addLog('LOGIN', `User logged in: ${username}`);
        return { message: 'LOGIN SUCCESS', profileName: user.profileName };
    },

    // --- BARANG (INVENTORY) ---
    getBarang(page = 1, limit = 10, search = "", sortBy = "namaBarang") {
        let all = this._get(KEYS.BARANG);
        
        // Search
        if (search) {
            const s = search.toLowerCase();
            all = all.filter(b => {
                const name = (b.namaBarang || "").toLowerCase();
                const supplier = (b.supplier && b.supplier.namaSupplier) ? b.supplier.namaSupplier.toLowerCase() : "";
                return name.includes(s) || supplier.includes(s);
            });
        }

        // Sort
        all.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });

        const start = (page - 1) * limit;
        const data = all.slice(start, start + limit);
        
        return {
            data,
            page,
            total_record: all.length,
            total_page: Math.ceil(all.length / limit)
        };
    },

    findBarangById(id) {
        const all = this._get(KEYS.BARANG);
        return all.find(b => b.id === parseInt(id));
    },

    createBarang(item) {
        const all = this._get(KEYS.BARANG);
        // Use timestamp + random suffix to ensure uniqueness in tight loops
        const newItem = { 
            ...item, 
            id: Date.now() + Math.floor(Math.random() * 1000),
            imageUrl: item.imageUrl || `https://picsum.photos/seed/${Date.now()}/200`
        };
        all.push(newItem);
        this._set(KEYS.BARANG, all);
        this._addLog('CREATE_BARANG', `Added item: ${item.namaBarang}`);
        return newItem;
    },

    updateBarang(id, updatedItem) {
        const all = this._get(KEYS.BARANG);
        const index = all.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
            all[index] = { ...updatedItem, id: parseInt(id) };
            this._set(KEYS.BARANG, all);
            this._addLog('UPDATE_BARANG', `Updated item: ${updatedItem.namaBarang}`);
            return all[index];
        }
    },

    deleteBarang(id) {
        let all = this._get(KEYS.BARANG);
        const item = all.find(b => b.id === parseInt(id));
        all = all.filter(b => b.id !== parseInt(id));
        this._set(KEYS.BARANG, all);
        if (item) this._addLog('DELETE_BARANG', `Deleted item: ${item.namaBarang}`);
    },

    // --- SUPPLIERS ---
    getSuppliers(page = 1, limit = 10) {
        const all = this._get(KEYS.SUPPLIERS);
        const start = (page - 1) * limit;
        const data = all.slice(start, start + limit);
        return {
            data,
            page,
            total_record: all.length,
            total_page: Math.ceil(all.length / limit)
        };
    },

    findSupplierById(id) {
        const all = this._get(KEYS.SUPPLIERS);
        return all.find(s => s.id === parseInt(id));
    },

    createSupplier(supplier) {
        const all = this._get(KEYS.SUPPLIERS);
        const newSupplier = { ...supplier, id: Date.now() };
        all.push(newSupplier);
        this._set(KEYS.SUPPLIERS, all);
        this._addLog('CREATE_SUPPLIER', `Added supplier: ${supplier.namaSupplier}`);
        return newSupplier;
    },

    updateSupplier(id, updatedSupplier) {
        const all = this._get(KEYS.SUPPLIERS);
        const index = all.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            all[index] = { ...updatedSupplier, id: parseInt(id) };
            this._set(KEYS.SUPPLIERS, all);
            this._addLog('UPDATE_SUPPLIER', `Updated supplier: ${updatedSupplier.namaSupplier}`);
            return all[index];
        }
    },

    deleteSupplier(id) {
        let all = this._get(KEYS.SUPPLIERS);
        const item = all.find(s => s.id === parseInt(id));
        all = all.filter(s => s.id !== parseInt(id));
        this._set(KEYS.SUPPLIERS, all);
        if (item) this._addLog('DELETE_SUPPLIER', `Deleted supplier: ${item.namaSupplier}`);
    },

    // --- ANALYTICS ---
    getStats() {
        const barang = this._get(KEYS.BARANG);
        const suppliers = this._get(KEYS.SUPPLIERS);
        
        const totalValue = barang.reduce((sum, item) => sum + (parseFloat(item.harga) * parseInt(item.stok)), 0);
        const lowStock = barang.filter(item => parseInt(item.stok) < 10).length;
        
        return {
            totalItems: barang.length,
            totalValue,
            lowStock,
            totalSuppliers: suppliers.length
        };
    },

    getAllBarang() {
        return this._get(KEYS.BARANG);
    },

    getAllSuppliers() {
        return this._get(KEYS.SUPPLIERS);
    }
};
