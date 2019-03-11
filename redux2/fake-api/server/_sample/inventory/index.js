const express = require("express");
const data = require("./data.js");
const _ = require("lodash");
const { BAD_REQUEST } = require("../../constants");

const router = express.Router();

router.get("/item", (req, res) => {
    const { tenantId, itemId } = req.query;

    const item = data.items.find(x => x.tenantId === tenantId && x.itemId === itemId);

    if (_.isNil(item)) {
        res.sendStatus(BAD_REQUEST);
        return;
    }

    res.json(item);
});

router.post("/add-item", (req, res) => {
    const { tenantId, itemId, name } = req.body;

    const existingItem = data.items.find(x => x.tenantId === tenantId && x.name === name);

    if (!_.isNil(existingItem)) {
        res.status(BAD_REQUEST).json({
            errors: ["NameAlreadyExists"]
        });
        return;
    }

    const newItem = {
        tenantId,
        itemId,
        name,
        isActive: true,
        deactivationReason: null,
        qty: 0,
        version: 0
    };

    data.items.push(newItem);

    res.json({
        events: [
            {
                type: "InventoryItemAddedEvent",
                payload: {
                    tenantId,
                    itemId,
                    itemName: name,
                    version: 1
                }
            }
        ]
    });
});

router.post("/deactivate-item", (req, res) => {
    const { tenantId, itemId, reason, version } = req.body;

    const item = data.items.find(x => x.tenantId === tenantId && x.itemId === itemId);

    if (_.isNil(item)) {
        res.sendStatus(BAD_REQUEST);
        return;
    }

    item.isActive = false;
    item.deactivationReason = reason;

    res.json({
        events: [
            {
                type: "InventoryItemDeactivatedEvent",
                payload: {
                    tenantId,
                    itemId,
                    version: 1
                }
            }
        ]
    });
});

router.get("/activated-items-count", (req, res) => {
    if (_.isNil(req.query.tenantId)) {
        res.sendStatus(BAD_REQUEST);
        return;
    }

    res.json({
        count: data.items.filter(x => x.isActive).length
    });
});

router.get("/", (req, res) => {
    if (_.isNil(req.query.tenantId)) {
        res.sendStatus(BAD_REQUEST);
        return;
    }

    res.json(data.items);
});

module.exports = router;
