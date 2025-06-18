// --
// OTOBO is a web-based ticketing system for service organisations.
// --
// Copyright (C) 2001-2020 OTRS AG, https://otrs.com/
// Copyright (C) 2019-2025 Rother OSS GmbH, https://otobo.io/
// --
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
// --

"use strict";

var Core = Core || {};
Core.Customer = Core.Customer || {};

/**
 * @namespace Core.Customer.Search
 * @memberof Core.Customer
 * @author Rother OSS GmbH
 * @description
 *      This namespace contains special functions for the ticket search in the customer interface.
 */
Core.Customer.Search = (function (TargetNS) {

    /**
     * @name Init
     * @memberof Core.Customer.Search
     * @function
     * @description
     *      This function initializes the module functionality.
     */
    TargetNS.Init = function(){
        $('#oooSearchBox').on('click', function () {
            $('#oooSearch').addClass('oooFull');
            $('#oooSearch').focus();

            // TODO: include FAQ to ES
            if (Core.Config.Get('ESActive') == 1 && Core.Config.Get('Action') !== 'CustomerFAQExplorer' && Core.Config.Get('Action') !== 'CustomerFAQZoom'){
                Core.UI.Elasticsearch.InitSearchField($('#oooSearch'), "CustomerElasticsearchQuickResult");
            }

            $('#oooSearch').on('blur', function () {
                setTimeout(function() {
                    $('#oooSearch').removeClass('oooFull');
                    $('#oooSearch').val('');
                },60);
            });
        });

        /*Core.App.Subscribe('Event.UI.Dialog.CloseDialog.Close', function() {
            $('#oooSearch').blur();
        });*/

// Rother OSS / CustomerTicketSearch
        var  $DateTimeDynamicFieldCheckboxes = $('.oooTicketSearchForm .Row_DynamicField .TimeRestrictionField input[type=checkbox]');
        $DateTimeDynamicFieldCheckboxes.each( function(Index, Element) {
            var $Field = $(this.closest('.Field'));
            $Field.addClass('oooCheckboxContainer');
            var Icon = $("<i class='oooAltCheck ooofo'></i>").on('click', function() {
                $(Element).click();
            });
            $(this).after( Icon );
        });


        //submit event should be triggered before form submit
        $('.oooTicketSearchForm form').on('submit', function () {
            $DateTimeDynamicFieldCheckboxes.each( function() {
                if (!this.checked) {
                    // disabled input fields should not be submitted
                    $(this).siblings('input').prop('disabled', true);
                }
            });
        });
// EO CustomerTicketSearch
    };

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Customer.Search || {}));
